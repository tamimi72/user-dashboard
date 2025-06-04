import { Button, Divider, Modal, Text } from '@nextui-org/react';
import React from 'react';
import { Flex } from '../styles/flex';

export const AddUser = () => {
   const [visible, setVisible] = React.useState(false);
   const handler = () => setVisible(true);
   const closeHandler = () => {
      setVisible(false);
      console.log('closed');
   };

   const handleFileDrop = (e) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      console.log('Dropped files:', files);
   };

   const handleFileChange = (e) => {
      const files = Array.from(e.target.files);
      console.log('Selected files:', files);
   };

   const inputStyle = {
      width: '100%',
      padding: '10px 14px',
      fontSize: '15px',
      border: '2px solid #ccc',
      borderRadius: '10px',
      outline: 'none',
      transition: 'border-color 0.3s ease, transform 0.25s ease',
   };

   const inputFocusStyle = {
      borderColor: '#0070f3',
      transform: 'scale(1.03)',
   };

   return (
      <div>
         <Button
            auto
            onClick={handler}
            css={{
              padding: '0 18px',
              height: '36px',
              minWidth: '90px',
              fontWeight: 600,
              fontSize: '0.97rem',
              borderRadius: '6px',
              background: 'linear-gradient(90deg, #0072F5 0%, #00C6FB 100%)',
              color: '#fff',
              boxShadow: '0 1px 6px rgba(0,114,245,0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              letterSpacing: '0.01em',
              transition: 'box-shadow 0.18s, transform 0.18s',
              '&:hover': {
                boxShadow: '0 3px 12px rgba(0,114,245,0.13)',
                transform: 'translateY(-1px) scale(1.03)',
                background: 'linear-gradient(90deg, #005bea 0%, #00c6fb 100%)',
              },
            }}
            icon={
              <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            }
         >
            Upload
         </Button>

         <Modal
            closeButton
            aria-labelledby="modal-title"
            width="600px"
            open={visible}
            onClose={closeHandler}
         >
            <Modal.Header css={{ justifyContent: 'start' }}>
               <Text id="modal-title" h4>
                  Upload file(s)
               </Text>
            </Modal.Header>

            <Divider css={{ my: '$5' }} />

            <Modal.Body css={{ py: '$10' }}>
               <Flex
                  direction="column"
                  css={{
                     flexWrap: 'wrap',
                     gap: '$6',
                     '@lg': { flexWrap: 'nowrap', gap: '$10' },
                  }}
               >
                  <Flex
                     css={{
                        gap: '$6',
                        flexWrap: 'wrap',
                        '@lg': { flexWrap: 'nowrap' },
                     }}
                  >

                     {/* Last Name Input */}
                     <div style={{ flex: 1 }}>
                        <label
                           htmlFor="lastName"
                           style={{ fontSize: '14px', marginBottom: '6px', display: 'block' }}
                        >
                           Description
                        </label>
                        <input
                           id="lastName"
                           type="text"
                           placeholder="Description"
                           style={inputStyle}
                           onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                           onBlur={(e) => {
                              e.target.style.borderColor = '#ccc';
                              e.target.style.transform = 'scale(1)';
                           }}
                        />
                     </div>
                  </Flex>

                  {/* Drag & Drop Upload Area */}
                  <Flex
                     direction="column"
                     onDragOver={(e) => e.preventDefault()}
                     onDrop={handleFileDrop}
                     onClick={() =>
                        document.getElementById('hidden-file-input')?.click()
                     }
                     css={{
                        border: '2px dashed #ccc',
                        borderRadius: '12px',
                        padding: '50px 30px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'border-color 0.3s ease, background-color 0.3s ease',
                        '&:hover': {
                           borderColor: '#0070f3',
                           backgroundColor: '#e6f4ff',
                        },
                     }}
                  >
                     <input
                        id="hidden-file-input"
                        type="file"
                        multiple
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                     />
                     <Text css={{ color: '#888' }}>
                        Drag and drop files here or{' '}
                        <span
                           style={{
                              color: '#0070f3',
                              textDecoration: 'underline',
                              cursor: 'pointer',
                           }}
                        >
                           click to upload
                        </span>
                     </Text>
                  </Flex>
               </Flex>
            </Modal.Body>

            <Divider css={{ my: '$5' }} />

            <Modal.Footer>
               <Button auto onClick={closeHandler}>
                  Upload
               </Button>
            </Modal.Footer>
         </Modal>
      </div>
   );
};
