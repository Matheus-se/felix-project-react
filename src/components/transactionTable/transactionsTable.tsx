'use client';

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	Row,
	SortingState,
	useReactTable
} from '@tanstack/react-table';
import * as m from '@/paraglide/messages.js';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useContext, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { TransactionContext } from '@/src/context/transactionContext';
import { ArrowRight, Loader2, X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog';
import { Transaction } from './transactions';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function TransactionsTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
	const { searchParams, nextPage, isLoading } = useContext(TransactionContext);

	const [sorting, setSorting] = useState<SortingState>([]);
	const [modalData, setModalData] = useState<Transaction>({} as Transaction);
	const [isOpen, setIsopen] = useState<boolean>(false);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		autoResetPageIndex: false,
		onSortingChange: setSorting,
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting
		}
	});

	const formatMoney = (amount: number, currency: string = "MXN") =>
		new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: currency
		}).format(amount);

	useEffect(() => {
		table.firstPage();
	}, [searchParams]);

	useEffect(() => {
		table.setColumnVisibility({ currency: false });
	}, [table]);
	return (
		<div className="w-full">
			<Dialog open={isOpen} onOpenChange={setIsopen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Transaction {modalData.transaction_id}</DialogTitle>
						<div className="flex items-center justify-center pt-4">
							<div className="flex items-center justify-center">
								<span
									className={cn(
										'flex h-2 w-2 -translate-y-1 mx-1 rounded-full',
										modalData.status == 'Pending'
											? 'bg-sky-500'
											: modalData.status == 'In Progress'
											? 'bg-amber-400'
											: modalData.status == 'Completed'
											? 'bg-green-500'
											: 'bg-red-500'
									)}
								/>
								<p className="capitalize">{modalData.status}</p>
							</div>
						</div>
						<div className="flex items-center justify-center border-b p-4 mb-4">
							<p className="text-2xl font-bold">{formatMoney(modalData.amount_sent, 'USD')}</p>
							<ArrowRight />
							<p className="text-2xl font-bold">
								{formatMoney(modalData.amount_received)}
							</p>
						</div>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="text-md">
							<span className="font-bold">From:</span> {modalData.sender_whatsapp}
							<br />
							<span className="font-bold">To:</span> {modalData.receiver_whatsapp}
							<br />
							<span className="font-bold">Payment Method:</span> {modalData.payment_method}
						</div>
					</div>
					<div className="text-right">
						<p>{formatMoney(modalData.amount_sent, 'USD')}</p>
						<div className="flex items-center justify-end ">
							<div className="border-b w-1/5 flex items-center justify-end">
								<X size={15} /> <p>{modalData.exchange_rate}</p>
							</div>
						</div>
						<p>{formatMoney(modalData.amount_received)}</p>
					</div>
				</DialogContent>
			</Dialog>
			{isLoading && data.length == 0 ? (
				<Skeleton className="h-[490px] w-full rounded-xl" />
			) : (
				<>
					<div className="rounded-md border">
						<Table>
							<TableHeader>
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map((header, i) => {
											return (
												<TableHead
													className={
														i == 0 ? 'pl-5' : i == headerGroup.headers.length - 1 ? 'pr-5' : ''
													}
													key={header.id}
												>
													{header.isPlaceholder
														? null
														: flexRender(header.column.columnDef.header, header.getContext())}
												</TableHead>
											);
										})}
									</TableRow>
								))}
							</TableHeader>
							<TableBody>
								{table.getRowModel().rows?.length ? (
									table.getRowModel().rows.map((row, i) => (
										<TableRow
											onClick={() => {
												setModalData(data[i] as Transaction);
												setIsopen(true);
											}}
											key={row.id}
											data-state={row.getIsSelected() && 'selected'}
										>
											{row.getVisibleCells().map((cell, i) => (
												<TableCell
													className={cn(
														'py-3',
														i == 0 ? 'pl-5' : i == row.getVisibleCells().length - 1 ? 'pr-5' : ''
													)}
													key={cell.id}
												>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</TableCell>
											))}
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={columns.length} className="h-24 text-center">
											{m.no_results()}
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
					<div className="flex items-center justify-end space-x-2 py-4">
						<div className="space-x-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => table.previousPage()}
								disabled={!table.getCanPreviousPage()}
							>
								{m.previous()}
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => {
									nextPage();
									table.nextPage();
								}}
								disabled={!table.getCanNextPage() || isLoading}
							>
								{isLoading ? <Loader2 className="animate-spin" /> : m.next()}
							</Button>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
