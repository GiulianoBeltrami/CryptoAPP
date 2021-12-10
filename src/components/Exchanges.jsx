import React from 'react';
import millify from 'millify';
import { Table, Collapse, Row, Col, Typography, Avatar, Space} from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetCryptoExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;
const { Column, ColumnGroup } = Table;

const Exchanges = () => {
  const { data, isFetching } = useGetCryptoExchangesQuery();
  const exchangesList = data?.data?.exchanges;

  if (isFetching) return <Loader />;

  const dataSource = exchangesList.map((exchange) => ({
      key: exchange.rank,
      exchanges: 
      (
        <>
          <Text><strong>{exchange.rank}.</strong></Text>
          <Avatar className="exchange-image" src={exchange.iconUrl} />
          <Text><strong>{exchange.name}</strong></Text>
        </>
      ),
      volume: (<>US${millify(exchange.volume)}</>),
      numberOfMarkets: millify(exchange.numberOfMarkets),
      marketShare: (<>{millify(exchange.marketShare)}%</>),
      description:HTMLReactParser(exchange.description || '')
  }));

  return (
    <>
      <Table pagination={false}
             expandRowByClick={true}
             dataSource={dataSource}
             expandable={{
              expandedRowRender: record => (<p style={{ margin: 0 }}>{record.description}</p>)
            }}>
        <Column title="Exchanges" dataIndex="exchanges" key="exchanges" />
        <Column title="Volume de negociação em 24h" dataIndex="volume" key="volume" />
        <Column title="Numero de mercado" dataIndex="numberOfMarkets" key="numberOfMarkets" />
        <Column title="Participação de mercado" dataIndex="marketShare" key="marketShare" />
      </Table>
    </>
  );
};

export default Exchanges;
