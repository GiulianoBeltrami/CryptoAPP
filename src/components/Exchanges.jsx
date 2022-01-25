import { Avatar, Table, Typography } from 'antd';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import React from 'react';
import { useGetCryptoExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const { Column } = Table;

const Exchanges = () => {
  const { data, isFetching } = useGetCryptoExchangesQuery();
  const exchangesList = data?.exchanges;

  if (isFetching) return <Loader />;

  console.log(data);
  
  return (
    <>
      <Table pagination={false}
        expandRowByClick={true}
        dataSource={exchangesTableRow(exchangesList)}
        expandable={{
          expandedRowRender: exchange => (<p style={{ margin: 0 }}>{exchange.description}</p>)
        }}
        scroll={{ x: true }}
        >
        <Column title="Exchanges" dataIndex="exchanges" key="exchanges" />
        <Column title="Volume de negociação em 24h" dataIndex="volume" key="volume" />
        <Column title="Numero de mercado" dataIndex="numberOfMarkets" key="numberOfMarkets"  />
        <Column title="Participação de mercado" dataIndex="marketShare" key="marketShare"  />
      </Table>
    </>
  );
};

const exchangesTableRow = (exchangeList) => {
  return (exchangeList.map((exchange) => (
    {
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
      description: HTMLReactParser(exchange.description || ''),
    }
  )));
}

export default Exchanges;
