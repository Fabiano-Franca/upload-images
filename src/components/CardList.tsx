import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const { onOpen, isOpen, onClose } = useDisclosure();
  // TODO SELECTED IMAGE URL STATE
  const [currentImageUrl, setCurrentImageUrl] = useState('');

  // TODO FUNCTION HANDLE VIEW IMAGE
  function handleViewImage(url: string): void {
    onOpen();
    setCurrentImageUrl(url);
  }
  return (
    <>
      {/* TODO CARD GRID */}
      <SimpleGrid columns={3} spacing={40}>
        {cards.map(card => (
          <Card data={card} viewImage={handleViewImage} />
        ))}
      </SimpleGrid>
      <ModalViewImage
        isOpen={isOpen}
        imgUrl={currentImageUrl}
        onClose={onClose}
      />
    </>
  );
}
