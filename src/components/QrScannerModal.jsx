import { useState, useRef, useEffect } from 'react'
import { Modal, Stack, Text, Alert, Loader, Center } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import QrScanner from 'qr-scanner'
import { useNavigate } from 'react-router-dom'

export default function QrScannerModal({ opened, onClose }) {
  const videoRef = useRef(null)
  const scannerRef = useRef(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Start scanner when modal opens
    if (opened && videoRef.current) {
      setError(null) // Clear previous errors
      
      scannerRef.current = new QrScanner(
        videoRef.current,
        (result) => {
          // --- Handle the scanned data ---
          console.log('Scanned QR:', result.data)
          scannerRef.current.stop() // Stop camera
          onClose()                 // Close modal
          
          // Check if it's an internal or external link
          if (result.data.startsWith('http')) {
            window.location.href = result.data // Navigate to external site
          } else if (result.data.startsWith('/')) {
            navigate(result.data) // Navigate to internal page
          } else {
            // Fallback for non-URL data
            alert(`Scanned data: ${result.data}`)
          }
        },
        {
          onDecodeError: (err) => {
            // This fires continuously, so we don't set a hard error
            // console.warn(err) 
          },
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      )

      // Start the scanner
      scannerRef.current.start().catch(err => {
        console.error(err)
        if (err === 'Permission denied') {
          setError('A permissão da câmera foi negada. Por favor, habilite o acesso à câmera nas configurações do seu navegador.')
        } else {
          setError('Não foi possível acessar a câmera. Tente recarregar a página.')
        }
      })
    }

    // Cleanup: Stop scanner when modal closes or component unmounts
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop()
        scannerRef.current.destroy()
        scannerRef.current = null
      }
    }
  }, [opened, onClose, navigate])

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Escanear QR Code"
      size="md"
    >
      <Stack gap="md">
        <div style={{ width: '100%', position: 'relative' }}>
          {/* This video element will be controlled by the scanner */}
          <video
            ref={videoRef}
            style={{ 
              width: '100%',
              height: '100%',
              borderRadius: 8,
              border: '1px solid #dee2e6'
            }} 
          />
          
          {/* Show loader or error */}
          {!error && (
            <Center style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
              <Loader color="turquoise" />
            </Center>
          )}

          {error && (
            <Alert
              icon={<IconAlertCircle size={16} />}
              title="Erro na Câmera"
              color="red"
              variant="light"
            >
              {error}
            </Alert>
          )}
        </div>
        
        <Text size="sm" c="dimmed" ta="center">
          Aponte a câmera para um QR code do seu livro.
        </Text>
      </Stack>
    </Modal>
  )
}