import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return(
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          w="auto"
          h="auto"
          maxW={['300px', '500px', '900px']}
          maxH={['400px', '500px', '600px']}
        >
        <Image
          src={imgUrl}
          w="auto"
          h="auto"
          maxW={['300px', '500px', '900px']}
          maxH={['400px', '500px', '600px']}
        />
        <ModalFooter
          bg="pGray.800"
          borderBottomRadius={5}
          justifyContent="left"
          pt={1}
          pb={1}
        >
          <Link href={imgUrl} isExternal >
            Abrir original
          </Link>
        </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
