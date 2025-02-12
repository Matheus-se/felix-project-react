"use client"

import { baseUrl } from '@/lib/utils';
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { Transaction } from '../components/transactionTable/transactions';

interface TransactionContextData {
	nextPage: () => void;
    setReceiverWhatsapp: Dispatch<SetStateAction<string>>;
    setSenderWhatsapp: Dispatch<SetStateAction<string>>;
    setTransactionId: Dispatch<SetStateAction<string>>;
    data: Transaction[];
    senderWhatsapp: string;
    receiverWhatsapp: string;
    transactionId: string;
    isLoading: boolean;
    searchParams: ReadonlyURLSearchParams;
}

export const TransactionContext = createContext<TransactionContextData>({} as TransactionContextData);

const TransactionContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [senderWhatsapp, setSenderWhatsapp] = useState("");
	const [receiverWhatsapp, setReceiverWhatsapp] = useState("");
	const [transactionId, setTransactionId] = useState("");
	const [page, setPage] = useState(1);
	const [data, setData] = useState<Transaction[]>([]);
	const searchParams = useSearchParams();

	function getRandomCurrency() {
		const currencies = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "SEK", "NZD"];
		const randomIndex = Math.floor(Math.random() * currencies.length);
		return currencies[randomIndex];
	  }

	async function getData() {
        setIsLoading(true);

		let fetchDataUrl = baseUrl;
        fetchDataUrl.searchParams.set('p', page.toString());
		searchParams.entries().forEach((param) => fetchDataUrl.searchParams.set(param[0], param[1]));

		const data = await fetch(baseUrl, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});

		const json = await data.json();

		if (page == 1) {
            setData(json);
        } else{
            setData(prev => [...prev, ...json]);
        }

        setIsLoading(false);
	}

	const resetPage = () => {
		setPage(1);
	};
	const nextPage = () => {
		setPage((prev) => prev + 1);
	};

    useEffect(() => {
        if (!searchParams.toString()) return;

        if (searchParams.has("sender_whatsapp")) {
            setSenderWhatsapp(searchParams.get("sender_whatsapp") || "");
        }

        if (searchParams.has("receiver_whatsapp")) {
            setReceiverWhatsapp(searchParams.get("receiver_whatsapp") || "");
        }

        if (searchParams.has("transaction_id")) {
            setTransactionId(searchParams.get("transaction_id") || "");
        }

        resetPage();
		getData();
	}, [searchParams]);

    useEffect(() => {
		getData();
	}, [page]);

	return (
		<TransactionContext.Provider value={{ searchParams, isLoading, data, nextPage, transactionId, receiverWhatsapp, senderWhatsapp, setReceiverWhatsapp, setSenderWhatsapp, setTransactionId }}>
			{children}
		</TransactionContext.Provider>
	);
};

export default TransactionContextProvider;
