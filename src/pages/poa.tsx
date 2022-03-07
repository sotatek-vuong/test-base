import { AssetItem } from '@/components';
import { Container, Typography } from '@mui/material';
import _ from 'lodash';
import { NextPage } from 'next';
import { useSelector } from 'react-redux';

const POAPage: NextPage = () => {
  const pairs = useSelector((s) =>
    _.chain(s.meta.tokenPairs.data).groupBy('from_symbol').toPairs().value(),
  );

  return (
    <Container sx={{ flex: 1, my: 4 }}>
      <Typography variant="h2" sx={{ mb: 4 }}>
        Proof Of Asset
      </Typography>

      {pairs.map(([fromSymbol, items]) => {
        return <AssetItem key={fromSymbol} fromSymbol={fromSymbol} items={items} />;
      })}
    </Container>
  );
};

export default POAPage;
