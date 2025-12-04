'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, TrendingUp, ShoppingCart, AlertCircle } from 'lucide-react';

interface Order {
  id: string;
  customerId: string;
  customerName: string;
  product: string;
  amount: number;
  date: string;
  status: 'Completed' | 'Pending' | 'Cancelled';
}

interface ProfitRecord {
  id: string;
  date: string;
  product: string;
  customer: string;
  profitAmount: number;
  status: 'Completed' | 'Pending';
}

interface Withdrawal {
  id: string;
  amount: number;
  requestedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  bankName: string;
  accountNumber: string;
}

interface WithdrawalHistory {
  id: string;
  amount: number;
  requestedDate: string;
  completedDate: string;
  status: 'Approved' | 'Rejected';
  bankName: string;
  transactionReference: string;
}

export default function ShopDashboardPage() {
  const [withdrawalDialogOpen, setWithdrawalDialogOpen] = useState(false);
  const [withdrawalForm, setWithdrawalForm] = useState({
    amount: '',
    bankName: '',
    accountNumber: '',
    accountHolderName: '',
    phoneNumber: '',
  });

  // Mock data
  const [stats] = useState({
    availableBalance: 0.10,
    totalProfit: 0.10,
    totalOrders: 1,
    pendingWithdrawals: 0,
  });

  const [orders] = useState<Order[]>([
    {
      id: 'ORD001',
      customerId: 'CUST001',
      customerName: 'John Doe',
      product: '1GB Data Package',
      amount: 5.0,
      date: '2025-12-03',
      status: 'Completed',
    },
  ]);

  const [profitHistory] = useState<ProfitRecord[]>([
    {
      id: 'PROF001',
      date: '2025-12-03',
      product: '1GB Data Package',
      customer: 'John Doe',
      profitAmount: 0.10,
      status: 'Completed',
    },
  ]);

  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);

  const [withdrawalHistory] = useState<WithdrawalHistory[]>([
    {
      id: 'WTH001',
      amount: 0.10,
      requestedDate: '2025-12-03',
      completedDate: '2025-12-03',
      status: 'Rejected',
      bankName: 'mobile_money',
      transactionReference: 'REF123456',
    },
  ]);

  const handleRequestWithdrawal = () => {
    setWithdrawalForm({
      amount: '',
      bankName: '',
      accountNumber: '',
      accountHolderName: '',
      phoneNumber: '',
    });
    setWithdrawalDialogOpen(true);
  };

  const handleSubmitWithdrawal = () => {
    if (!withdrawalForm.amount || !withdrawalForm.bankName || !withdrawalForm.accountNumber) {
      alert('Please fill in all required fields');
      return;
    }

    const amount = parseFloat(withdrawalForm.amount);
    if (amount > stats.availableBalance) {
      alert('Withdrawal amount exceeds available balance');
      return;
    }

    const newWithdrawal: Withdrawal = {
      id: `WTH${Date.now()}`,
      amount,
      requestedDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      bankName: withdrawalForm.bankName,
      accountNumber: withdrawalForm.accountNumber,
    };

    setWithdrawals([...withdrawals, newWithdrawal]);
    setWithdrawalDialogOpen(false);
    alert('Withdrawal request submitted successfully');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Shop Dashboard</h1>
        <p className="text-gray-600 mt-1">Track your profits and manage withdrawals</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Available Balance Card */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
            <Wallet className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">GHS {stats.availableBalance.toFixed(2)}</div>
            <p className="text-xs text-gray-600 mt-1">Ready to withdraw</p>
          </CardContent>
        </Card>

        {/* Total Profit Card */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">GHS {stats.totalProfit.toFixed(2)}</div>
            <p className="text-xs text-gray-600 mt-1">All time profit</p>
          </CardContent>
        </Card>

        {/* Total Orders Card */}
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.totalOrders}</div>
            <p className="text-xs text-gray-600 mt-1">All orders</p>
          </CardContent>
        </Card>

        {/* Pending Withdrawals Card */}
        <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Withdrawals</CardTitle>
            <AlertCircle className="h-4 w-4 text-pink-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pink-600">{withdrawals.length}</div>
            <p className="text-xs text-gray-600 mt-1">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      {/* Request Withdrawal Button */}
      <Button
        onClick={handleRequestWithdrawal}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg font-semibold"
      >
        Request Withdrawal
      </Button>

      {/* Withdrawal Request Dialog */}
      <Dialog open={withdrawalDialogOpen} onOpenChange={setWithdrawalDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Request Withdrawal</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="withdrawal-amount">Amount to Withdraw (GHS)</Label>
              <Input
                id="withdrawal-amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={withdrawalForm.amount}
                onChange={(e) => setWithdrawalForm({ ...withdrawalForm, amount: e.target.value })}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">Available: GHS {stats.availableBalance.toFixed(2)}</p>
            </div>
            <div>
              <Label htmlFor="bank-name">Bank Name</Label>
              <select
                id="bank-name"
                value={withdrawalForm.bankName}
                onChange={(e) => setWithdrawalForm({ ...withdrawalForm, bankName: e.target.value })}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Bank</option>
                <option value="mobile_money">Mobile Money</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="mtn_momo">MTN Mobile Money</option>
                <option value="vodafone_cash">Vodafone Cash</option>
              </select>
            </div>
            <div>
              <Label htmlFor="account-number">Account Number</Label>
              <Input
                id="account-number"
                placeholder="Enter account number"
                value={withdrawalForm.accountNumber}
                onChange={(e) => setWithdrawalForm({ ...withdrawalForm, accountNumber: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="account-holder">Account Holder Name</Label>
              <Input
                id="account-holder"
                placeholder="Enter account holder name"
                value={withdrawalForm.accountHolderName}
                onChange={(e) => setWithdrawalForm({ ...withdrawalForm, accountHolderName: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone-number">Phone Number</Label>
              <Input
                id="phone-number"
                placeholder="Enter phone number"
                value={withdrawalForm.phoneNumber}
                onChange={(e) => setWithdrawalForm({ ...withdrawalForm, phoneNumber: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setWithdrawalDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitWithdrawal} className="bg-purple-600 hover:bg-purple-700">
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tabs Section */}
      <Tabs defaultValue="recent-orders" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recent-orders">Recent Orders ({orders.length})</TabsTrigger>
          <TabsTrigger value="profit-history">Profit History ({profitHistory.length})</TabsTrigger>
          <TabsTrigger value="withdrawals">Withdrawals ({withdrawals.length})</TabsTrigger>
          <TabsTrigger value="withdrawal-history">Withdrawal History</TabsTrigger>
        </TabsList>

        {/* Recent Orders Tab */}
        <TabsContent value="recent-orders">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your latest customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No orders yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-2">Order ID</th>
                        <th className="text-left py-2 px-2">Customer</th>
                        <th className="text-left py-2 px-2">Product</th>
                        <th className="text-left py-2 px-2">Amount</th>
                        <th className="text-left py-2 px-2">Date</th>
                        <th className="text-left py-2 px-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-2 font-medium">{order.id}</td>
                          <td className="py-2 px-2">{order.customerName}</td>
                          <td className="py-2 px-2">{order.product}</td>
                          <td className="py-2 px-2 font-semibold">GHS {order.amount.toFixed(2)}</td>
                          <td className="py-2 px-2">{order.date}</td>
                          <td className="py-2 px-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profit History Tab */}
        <TabsContent value="profit-history">
          <Card>
            <CardHeader>
              <CardTitle>Profit History</CardTitle>
              <CardDescription>Your profit records over time</CardDescription>
            </CardHeader>
            <CardContent>
              {profitHistory.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No profit records yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-2">Date</th>
                        <th className="text-left py-2 px-2">Product</th>
                        <th className="text-left py-2 px-2">Customer</th>
                        <th className="text-left py-2 px-2">Profit Amount</th>
                        <th className="text-left py-2 px-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profitHistory.map((record) => (
                        <tr key={record.id} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-2">{record.date}</td>
                          <td className="py-2 px-2">{record.product}</td>
                          <td className="py-2 px-2">{record.customer}</td>
                          <td className="py-2 px-2 font-semibold text-green-600">GHS {record.profitAmount.toFixed(2)}</td>
                          <td className="py-2 px-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              record.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {record.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Withdrawals Tab */}
        <TabsContent value="withdrawals">
          <Card>
            <CardHeader>
              <CardTitle>Pending Withdrawals</CardTitle>
              <CardDescription>Your withdrawal requests awaiting approval</CardDescription>
            </CardHeader>
            <CardContent>
              {withdrawals.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No pending withdrawals</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-2">Amount</th>
                        <th className="text-left py-2 px-2">Bank</th>
                        <th className="text-left py-2 px-2">Account</th>
                        <th className="text-left py-2 px-2">Requested Date</th>
                        <th className="text-left py-2 px-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {withdrawals.map((withdrawal) => (
                        <tr key={withdrawal.id} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-2 font-semibold">GHS {withdrawal.amount.toFixed(2)}</td>
                          <td className="py-2 px-2">{withdrawal.bankName}</td>
                          <td className="py-2 px-2">{withdrawal.accountNumber}</td>
                          <td className="py-2 px-2">{withdrawal.requestedDate}</td>
                          <td className="py-2 px-2">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                              {withdrawal.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Withdrawal History Tab */}
        <TabsContent value="withdrawal-history">
          <Card>
            <CardHeader>
              <CardTitle>Withdrawal History</CardTitle>
              <CardDescription>Your completed withdrawal transactions</CardDescription>
            </CardHeader>
            <CardContent>
              {withdrawalHistory.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No withdrawal history</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-2">Amount</th>
                        <th className="text-left py-2 px-2">Bank</th>
                        <th className="text-left py-2 px-2">Requested Date</th>
                        <th className="text-left py-2 px-2">Completed Date</th>
                        <th className="text-left py-2 px-2">Status</th>
                        <th className="text-left py-2 px-2">Reference</th>
                      </tr>
                    </thead>
                    <tbody>
                      {withdrawalHistory.map((history) => (
                        <tr key={history.id} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-2 font-semibold">GHS {history.amount.toFixed(2)}</td>
                          <td className="py-2 px-2">{history.bankName}</td>
                          <td className="py-2 px-2">{history.requestedDate}</td>
                          <td className="py-2 px-2">{history.completedDate}</td>
                          <td className="py-2 px-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              history.status === 'Approved' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {history.status}
                            </span>
                          </td>
                          <td className="py-2 px-2 text-gray-600">{history.transactionReference}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
