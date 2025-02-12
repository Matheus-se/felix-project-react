"use client"

import SearchBar from '../components/searchBar/searchBar';
import { TransactionsTable } from '../components/transactionTable/transactionsTable';
import { columns } from '../components/transactionTable/transactions';
import { useContext } from 'react';
import { TransactionContext } from '../context/transactionContext';

export default function Home() {
  const {data} = useContext(TransactionContext);

	return (
		<>
			<SearchBar/>
      <TransactionsTable columns={columns} data={data} />
		</>
	);
}
