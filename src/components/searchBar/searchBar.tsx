"use client"

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2, SearchIcon } from 'lucide-react';
import { useContext, useState } from 'react';
import Form from 'next/form';
import { TransactionContext } from '@/src/context/transactionContext';
import { languageTag } from '@/src/paraglide/runtime';
import * as m from "@/paraglide/messages.js"

const SearchBar = () => {
	const { receiverWhatsapp, senderWhatsapp, transactionId, setReceiverWhatsapp, setSenderWhatsapp, setTransactionId, isLoading } = useContext(TransactionContext);
	const [isSearching, setIsSearching] = useState(-1);
	const buttonsMap = [
		{
			title: m.sender(),
			desc: m.senders_whatsapp_number(),
			queryParam: 'sender_whatsapp',
			value: senderWhatsapp,
			onChange: setSenderWhatsapp
		},
		{
			title: m.receiver(),
			desc: m.receivers_whatsapp_number(),
			queryParam: 'receiver_whatsapp',
			value: receiverWhatsapp,
			onChange: setReceiverWhatsapp
		},
		{
			title: m.transaction_id(),
			desc: m.transaction_number(),
			queryParam: 'transaction_id',
			value: transactionId,
			onChange: setTransactionId
		}
	];

	return (
		<Form action={`/${languageTag()}/`} className="my-8 max-md:flex-col md:flex w-full md:rounded-full max-md:rounded-regular max-md:overflow-hidden md:overflow-visible border border-border shadow-md transition md:bg-gradient-to-r from-primary/10 from-80% lg:from-90% to-primary">
			<div
				data-searching={isSearching}
				className="data-[searching=-1]:bg-white bg-muted max-md:flex-col flex w-full md:rounded-full"
			>
				{buttonsMap.map((button, i) => {
					return (
						<Button
							variant="ghost"
							type='button'
							key={button.title}
							className={cn(
								'flex h-auto max-md:w-full md:w-auto flex-1 flex-col !items-start justify-center gap-0 md:rounded-full md:px-8 py-4 outline-none transition',
								isSearching == i ? 'bg-white hover:bg-white' : ''
							)}
						>
							<p className="text-secondary m-0 font-bold">{button.title}</p>
							<input
								name={button.queryParam}
								type="tel"
								value={button.value}
								onChange={(e) => button.onChange(e.target.value)}
								onBlur={() => setIsSearching(-1)}
								onFocus={() => setIsSearching(i)}
								placeholder={button.desc}
								className="text-md w-full !border-none bg-transparent p-0 font-normal !outline-none"
							/>
						</Button>
					);
				})}
			</div>
			<div className="justify-end z-50 md:w-20 w-full md:flex">
				<Button
					variant="link"
					type='submit'
					disabled={isLoading}
					className="md:rounded-r-full max-md:rounded-none w-full md:h-full max-md:h-14 outline-none flex md:bg-transparent max-md:bg-primary"
				>
					{isLoading ? <Loader2 className='animate-spin' color='white'/> : <><SearchIcon color="white" className="!w-5 !h-5" /><p className='md:hidden block text-white'>{m.search()}</p></>}
				</Button>
			</div>
		</Form>
	);
};

export default SearchBar;
