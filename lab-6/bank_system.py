import asyncio

class InsufficientFundsError(Exception):
    pass

class Account:
    def __init__(self, account_number: str, owner: str, balance: float = 0):
        self.account_number = account_number
        self.owner = owner
        self.balance = balance

    def deposit(self, amount: float):
        if amount <= 0:
            raise ValueError("Deposit amount must be greater than zero.")
        self.balance += amount

    def withdraw(self, amount: float):
        if amount > self.balance:
            raise InsufficientFundsError("Insufficient funds for this withdrawal.")
        if amount <= 0:
            raise ValueError("Withdrawal amount must be greater than zero.")
        self.balance -= amount

    async def transfer(self, to_account: 'Account', amount: float):
        if amount > self.balance:
            raise InsufficientFundsError("Insufficient funds for this transfer.")
        if amount <= 0:
            raise ValueError("Transfer amount must be greater than zero.")

        await asyncio.sleep(1)
        self.withdraw(amount)
        to_account.deposit(amount)

class Bank:
    def __init__(self):
        self.accounts = {}

    def create_account(self, account_number: str, owner: str, initial_balance: float):
        if account_number in self.accounts:
            raise ValueError("Account number already exists.")
        if initial_balance < 0:
            raise ValueError("Initial balance cannot be negative.")
        account = Account(account_number, owner, initial_balance)
        self.accounts[account_number] = account
        return account

    def get_account(self, account_number: str):
        if account_number not in self.accounts:
            raise ValueError("Account not found.")
        return self.accounts[account_number]

    async def process_transaction(self, transaction_func):
        await transaction_func()
