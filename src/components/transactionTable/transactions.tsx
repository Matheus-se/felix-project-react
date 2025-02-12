'use client';

import { Button } from '@/components/ui/button';
import * as m from "@/paraglide/messages.js"

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

export type Transaction = {
    transaction_id: string;
	sender_whatsapp: string;
    receiver_whatsapp: string;
    amount_sent: number;
    exchange_rate: number;
    amount_received: number;
    status: "Pending" | "In Progress" | "Completed" | "Failed";
	payment_method: "Bank deposit" | "Cash pickup" | "Mobile wallet";
	currency: string;
    date: Date;
};

export const columns: ColumnDef<Transaction>[] = [
	{
		accessorKey: 'sender_whatsapp',
		header: () => <div className="text-left">{m.senders_whatsapp()}</div>,
		cell: ({ row }) => <div className='text-left'>{row.getValue('sender_whatsapp')}</div>
	},
	{
		accessorKey: 'receiver_whatsapp',
		header: () => <div className="text-center">{m.receivers_whatsapp()}</div>,
		cell: ({ row }) => <div className='text-center'>{row.getValue('receiver_whatsapp')}</div>
	},
	{
		accessorKey: 'amount_sent',
		header: () => <div className="text-center">{m.amount_sent()}</div>,
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('amount_sent'));

			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD'
			}).format(amount);

			return <div className="text-center font-medium">{formatted}</div>;
		}
	},
	{
		accessorKey: 'amount_received',
		header: () => <div className="text-center">{m.amount_received()}</div>,
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('amount_received'));

			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: row.renderValue('currency')
			}).format(amount);

			return <div className="text-center font-medium">{formatted}</div>;
		}
	},
	{
		accessorKey: 'exchange_rate',
		header: () => <div className="text-center">{m.exchange_rate()}</div>,
		cell: ({ row }) => <div className="text-center">{row.getValue('exchange_rate')}</div>
	},
	{
		accessorKey: 'status',
		header: () => <div className="text-center">{m.status()}</div>,
		cell: ({ row }) => <div className="text-center capitalize">{row.getValue('status')}</div>
	},
	{
		accessorKey: 'currency',
		header: 'Currency',
		cell: ({ row }) => <div className="text-center capitalize">{row.getValue('currency')}</div>
	},
	{
		accessorKey: 'date',
		enableSorting: true,
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className='text-center w-full'
				>
					{m.date()}
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => {
			const date: string = row.getValue('date');
			const formatted = new Intl.DateTimeFormat('en-US', {
				dateStyle: "medium"
			}).format(new Date(date));

			return (
				<div className="lowercase text-center">{formatted}</div>
			)}
	},
	{
		accessorKey: 'payment_method',
		header: () => <div className="text-end">{m.payment_method()}</div>,
		cell: ({ row }) => <div className="text-end capitalize">{row.getValue('payment_method')}</div>
	},
];
