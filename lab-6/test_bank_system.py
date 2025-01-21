import pytest
import pytest_asyncio
from unittest.mock import AsyncMock
from bank_system import Account, Bank, InsufficientFundsError

@pytest_asyncio.fixture
async def account():
    return Account(account_number="123", owner="John Doe", balance=100.0)

@pytest_asyncio.fixture
async def bank():
    return Bank()

# Tests for Account class
@pytest.mark.parametrize("initial_balance,deposit_amount,expected_balance", [
    (100.0, 50.0, 150.0),
    (0.0, 100.0, 100.0),
    (50.0, 25.0, 75.0),
])
def test_deposit_parametrized(initial_balance, deposit_amount, expected_balance):
    account = Account(account_number="123", owner="John Doe", balance=initial_balance)
    account.deposit(deposit_amount)
    assert account.balance == expected_balance

@pytest.mark.parametrize("initial_balance,withdraw_amount,expected_balance", [
    (100.0, 50.0, 50.0),
    (200.0, 150.0, 50.0),
])
def test_withdraw_parametrized(initial_balance, withdraw_amount, expected_balance):
    account = Account(account_number="123", owner="John Doe", balance=initial_balance)
    account.withdraw(withdraw_amount)
    assert account.balance == expected_balance

    with pytest.raises(InsufficientFundsError):
        account.withdraw(initial_balance + 1)

    with pytest.raises(ValueError):
        account.withdraw(-10.0)

@pytest.mark.asyncio
@pytest.mark.parametrize("initial_balance,transfer_amount,target_balance,expected_balance", [
    (100.0, 50.0, 50.0, 50.0),
    (200.0, 150.0, 100.0, 50.0),
])
async def test_transfer_parametrized(initial_balance, transfer_amount, target_balance, expected_balance):
    from_account = Account(account_number="123", owner="John Doe", balance=initial_balance)
    to_account = Account(account_number="456", owner="Jane Smith", balance=target_balance)

    await from_account.transfer(to_account, transfer_amount)

    assert from_account.balance == expected_balance
    assert to_account.balance == target_balance + transfer_amount

    with pytest.raises(InsufficientFundsError):
        await from_account.transfer(to_account, initial_balance + 1)

# Tests for Bank class
def test_create_account(bank, account):
    account = bank.create_account("123", "John Doe", 100.0)
    assert account.account_number == "123"
    assert account.owner == "John Doe"
    assert account.balance == 100.0

    with pytest.raises(ValueError):
        bank.create_account("123", "Jane Smith", 50.0)

def test_get_account(bank, account):
    bank.create_account("123", "John Doe", 100.0)
    account = bank.get_account("123")
    assert account.owner == "John Doe"

    with pytest.raises(ValueError):
        bank.get_account("456")

@pytest.mark.asyncio
async def test_process_transaction(bank):
    from_account = bank.create_account("123", "John Doe", 100.0)
    to_account = bank.create_account("456", "Jane Smith", 50.0)

    async def transaction():
        await from_account.transfer(to_account, 50.0)

    await bank.process_transaction(transaction)

    assert from_account.balance == 50.0
    assert to_account.balance == 100.0

# Mocking external systems
@pytest.mark.asyncio
async def test_mocked_transfer():
    from_account = Account(account_number="123", owner="John Doe", balance=100.0)
    to_account = Account(account_number="456", owner="Jane Smith", balance=50.0)

    from_account.transfer = AsyncMock()
    from_account.transfer.return_value = None

    await from_account.transfer(to_account, 50.0)

    from_account.transfer.assert_called_once_with(to_account, 50.0)
