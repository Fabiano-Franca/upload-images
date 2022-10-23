import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Error } from '../components/Error';
import { Loading } from './../components/Loading';

interface Image {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface ImagesResponse {
  after: string;
  data: Image[];
}

export default function Home(): JSX.Element {

  async function fetchImages({ pageParam = null }): Promise<ImagesResponse> {
    const response = await api.get('/api/images', {
      params: {
        after: pageParam
      }
    });
    return response.data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',fetchImages, {
      getNextPageParam: lastPage => lastPage?.after || null,
    });

  //console.log(data)

  const formattedData = useMemo(() => {
    const formated = data?.pages.flatMap(objImage => {
      return objImage.data.flat();
    })
    return formated;
  }, [data]);

  console.log(formattedData)

  // TODO RENDER LOADING SCREEN
  if(isLoading){
    return <Loading />
  }

  // TODO RENDER ERROR SCREEN
  if(isError){
    return <Error />
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>

        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
        <div>
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
        </div>
      </Box>
    </>
  );
}
