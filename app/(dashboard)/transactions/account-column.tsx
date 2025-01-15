import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";

type Props = {
  account: string;
  accountId: string | null;
};

export const AccountColumn = ({ account, accountId }: Props) => {
  const { onOpen: onOpenAccount } = useOpenAccount();

  const onClick = () => {
    if (accountId) {
      onOpenAccount(accountId);
    }
  };

  return (
    <div
      className="flex items-center cursor-pointer hover:underline"
      onClick={onClick}
    >
      {account}
    </div>
  );
};
