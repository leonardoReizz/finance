"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./colums";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";
import { useState } from "react";
import { UploadButton } from "./upload-button";
import { ImportCard } from "./import-card";
import { transactions as transactionsSchema } from "@/db/schema"
import { useSelectAccount } from "@/hooks/use-select-account";
import { toast } from "sonner";
import { useBulkCreateTransactions } from "@/features/transactions/api/use-bulk-create-transactions";


const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  metadata: {}
}

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT"
}

const TransactionsPage = () => {
  const [AccountDialog, confirm] = useSelectAccount()
  const [variant, setVariant] = useState(VARIANTS.LIST)
  const [importsResults, setImportsResult] = useState(INITIAL_IMPORT_RESULTS)
  
  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    setVariant(VARIANTS.IMPORT)
    setImportsResult(results)
  }

  const onCancelImport = () => {
    setImportsResult(INITIAL_IMPORT_RESULTS)
    setVariant(VARIANTS.LIST)
  }

  const newTransaction = useNewTransaction();
  const createTransactions = useBulkCreateTransactions()
  const transactionsQuery = useGetTransactions();
  const deleteTransactions = useBulkDeleteTransactions();
  const transactions = transactionsQuery.data || [];

  const isDisabled = transactionsQuery.isLoading || transactionsQuery.isPending;

  const onSubmitImport = async (values: typeof transactionsSchema.$inferInsert[]) => {
    const accountId = await confirm()

    if(!accountId) {
      return toast.error("Please select an account to continue")
    }

    const data = values.map((value) => ({...value,accountId:accountId as string}))

    createTransactions.mutate(data, {
      onSuccess: () => {
        onCancelImport()
      }
    })
  }

  if (transactionsQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if(variant ===VARIANTS.IMPORT){
    return (
      <>
        <AccountDialog />
        <ImportCard data={importsResults.data} onCancel={onCancelImport} onSubmit={onSubmitImport}/>
      </>
    )
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Transactions History
          </CardTitle>
          <div className="flex items-center gap-x-2 lg:flex-row gap-y-2">
            <Button size="sm" onClick={newTransaction.onOpen} className="w-full lg:w-auto">
              <Plus className="size-4 mr-2" />
              Add New
            </Button>
            <UploadButton onUpload={onUpload} />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={transactions}
            filterKey="name"
            disabled={isDisabled}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteTransactions.mutate({ ids });
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;
