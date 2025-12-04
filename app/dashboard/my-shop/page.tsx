'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Edit, Trash2, Plus, DollarSign, Percent } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  network: string;
  size: string;
  validity: string;
  basePrice: number;
  markup: number;
  customerPrice: number;
  commission: number;
  isDefault: boolean;
}

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'default-1',
    name: '1GB Data Package',
    network: 'MTN',
    size: '1GB',
    validity: 'NON EXPIRE',
    basePrice: 4.55,
    markup: 10,
    customerPrice: 5.00,
    commission: 0.45,
    isDefault: true,
  },
  {
    id: 'default-2',
    name: '2GB Data Package',
    network: 'MTN',
    size: '2GB',
    validity: 'NON EXPIRE',
    basePrice: 9.09,
    markup: 10,
    customerPrice: 10.00,
    commission: 0.91,
    isDefault: true,
  },
  {
    id: 'default-3',
    name: '3GB Data Package',
    network: 'AirtelTigo',
    size: '3GB',
    validity: 'NON EXPIRE',
    basePrice: 13.64,
    markup: 10,
    customerPrice: 15.00,
    commission: 1.36,
    isDefault: true,
  },
  {
    id: 'default-4',
    name: '5GB Data Package',
    network: 'Telecel',
    size: '5GB',
    validity: 'NON EXPIRE',
    basePrice: 22.73,
    markup: 10,
    customerPrice: 25.00,
    commission: 2.27,
    isDefault: true,
  },
];

export default function MyShopPage() {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [defaultProductsEnabled, setDefaultProductsEnabled] = useState(true);
  const [selectedNetwork, setSelectedNetwork] = useState('All');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    network: 'MTN',
    size: '',
    validity: 'NON EXPIRE',
    basePrice: 0,
    markup: 10,
  });

  const networks = ['All', 'MTN', 'AirtelTigo', 'Telecel'];

  const filteredProducts = selectedNetwork === 'All'
    ? products.filter(p => !p.isDefault || defaultProductsEnabled)
    : products.filter(p => p.network === selectedNetwork && (!p.isDefault || defaultProductsEnabled));

  const handleToggleDefaultProducts = (enabled: boolean) => {
    setDefaultProductsEnabled(enabled);
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.size || newProduct.basePrice <= 0) {
      alert('Please fill in all fields');
      return;
    }

    const customerPrice = parseFloat((newProduct.basePrice * (1 + newProduct.markup / 100)).toFixed(2));
    const commission = parseFloat((customerPrice - newProduct.basePrice).toFixed(2));

    const product: Product = {
      id: `custom-${Date.now()}`,
      name: newProduct.name,
      network: newProduct.network,
      size: newProduct.size,
      validity: newProduct.validity,
      basePrice: newProduct.basePrice,
      markup: newProduct.markup,
      customerPrice,
      commission,
      isDefault: false,
    };

    setProducts([...products, product]);
    setNewProduct({
      name: '',
      network: 'MTN',
      size: '',
      validity: 'NON EXPIRE',
      basePrice: 0,
      markup: 10,
    });
    setIsAddingProduct(false);
  };

  const handleEditPrice = (product: Product, newMarkup: number) => {
    const customerPrice = parseFloat((product.basePrice * (1 + newMarkup / 100)).toFixed(2));
    const commission = parseFloat((customerPrice - product.basePrice).toFixed(2));

    setProducts(
      products.map(p =>
        p.id === product.id
          ? { ...p, markup: newMarkup, customerPrice, commission }
          : p
      )
    );
    setEditingProduct(null);
  };

  const handleDeleteProduct = (product: Product) => {
    setProducts(products.filter(p => p.id !== product.id));
    setDeletingProduct(null);
  };

  const defaultProductsCount = products.filter(p => p.isDefault).length;
  const customProductsCount = products.filter(p => !p.isDefault).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">My Data Shop</h1>
          <p className="text-slate-600">Quality data packages at affordable prices</p>
          <div className="flex items-center gap-2 mt-3">
            <Badge variant="default" className="bg-green-500">Active</Badge>
          </div>
        </div>

        {/* Default Products Toggle Section */}
        <Card className="mb-8 border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Default Products</CardTitle>
                <CardDescription>
                  Pre-configured packages with 10% markup (your commission)
                </CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-700">
                  {defaultProductsEnabled ? 'Enabled' : 'Disabled'}
                </span>
                <Switch
                  checked={defaultProductsEnabled}
                  onCheckedChange={handleToggleDefaultProducts}
                  className="h-6 w-11"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {DEFAULT_PRODUCTS.map(product => (
                <div key={product.id} className="bg-white rounded-lg p-4 border border-blue-100">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-slate-900">{product.name}</p>
                      <p className="text-xs text-slate-500">{product.network}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">Default</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Size:</span>
                      <span className="font-medium">{product.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Base Price:</span>
                      <span className="font-medium">GHS {product.basePrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Markup:</span>
                      <span className="font-medium text-blue-600">{product.markup}%</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Customer Price:</span>
                        <span className="font-bold text-green-600">GHS {product.customerPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Your Commission:</span>
                        <span className="font-bold text-purple-600">GHS {product.commission.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {!defaultProductsEnabled && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  ⚠️ Default products are disabled. Customers won't see these packages in your store.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Products Section */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Products</h2>
            <p className="text-slate-600 text-sm mt-1">
              {defaultProductsEnabled ? `${defaultProductsCount} default + ` : ''}{customProductsCount} custom products
            </p>
          </div>
          <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
            <DialogTrigger asChild>
              <Button className="bg-green-500 hover:bg-green-600 gap-2">
                <Plus className="w-4 h-4" />
                Add Custom Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add Custom Product</DialogTitle>
                <DialogDescription>
                  Create a new data package with your custom markup
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input
                    id="product-name"
                    placeholder="e.g., 10GB Data Package"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="network">Network</Label>
                  <Select value={newProduct.network} onValueChange={(value) => setNewProduct({ ...newProduct, network: value })}>
                    <SelectTrigger id="network">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MTN">MTN</SelectItem>
                      <SelectItem value="AirtelTigo">AirtelTigo</SelectItem>
                      <SelectItem value="Telecel">Telecel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="size">Size</Label>
                  <Input
                    id="size"
                    placeholder="e.g., 10GB"
                    value={newProduct.size}
                    onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="base-price">Base Price (GHS)</Label>
                  <Input
                    id="base-price"
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    value={newProduct.basePrice || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, basePrice: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="markup">Markup (%)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="markup"
                      type="number"
                      placeholder="10"
                      step="1"
                      value={newProduct.markup}
                      onChange={(e) => setNewProduct({ ...newProduct, markup: parseInt(e.target.value) || 0 })}
                    />
                    <span className="text-sm text-slate-600">
                      = GHS {(newProduct.basePrice * (1 + newProduct.markup / 100)).toFixed(2)}
                    </span>
                  </div>
                </div>
                <Button onClick={handleAddProduct} className="w-full bg-green-500 hover:bg-green-600">
                  Add Product
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Network Tabs */}
        <Tabs value={selectedNetwork} onValueChange={setSelectedNetwork} className="mb-6">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            {networks.map(network => (
              <TabsTrigger key={network} value={network}>
                {network}
              </TabsTrigger>
            ))}
          </TabsList>

          {networks.map(network => (
            <TabsContent key={network} value={network}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <Card key={product.id} className={`overflow-hidden transition-all hover:shadow-lg ${product.isDefault ? 'border-blue-200 bg-blue-50' : 'border-slate-200'}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{product.name}</CardTitle>
                          <CardDescription>{product.network}</CardDescription>
                        </div>
                        {product.isDefault && (
                          <Badge variant="outline" className="text-xs bg-blue-100 text-blue-700 border-blue-300">
                            Default
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-600">Size</p>
                          <p className="font-semibold text-slate-900">{product.size}</p>
                        </div>
                        <div>
                          <p className="text-slate-600">Validity</p>
                          <p className="font-semibold text-slate-900">{product.validity}</p>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-3 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 text-sm">Base Price</span>
                          <span className="font-medium text-slate-900">GHS {product.basePrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 text-sm">Markup</span>
                          <span className="font-medium text-blue-600">{product.markup}%</span>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 space-y-2 border border-green-200">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 text-sm font-medium">Customer Price</span>
                          <span className="font-bold text-green-600 text-lg">GHS {product.customerPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 text-sm font-medium">Your Commission</span>
                          <span className="font-bold text-purple-600 text-lg">GHS {product.commission.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 gap-2"
                              onClick={() => setEditingProduct(product)}
                            >
                              <DollarSign className="w-4 h-4" />
                              Edit Price
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Edit Markup</DialogTitle>
                              <DialogDescription>
                                Adjust the markup percentage for {product.name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label>Current Markup: {editingProduct?.markup}%</Label>
                                <div className="mt-2 p-3 bg-slate-100 rounded-lg">
                                  <p className="text-sm text-slate-600">Base Price: GHS {product.basePrice.toFixed(2)}</p>
                                  <p className="text-sm font-semibold text-slate-900 mt-1">
                                    Customer Price: GHS {editingProduct?.customerPrice.toFixed(2)}
                                  </p>
                                  <p className="text-sm font-semibold text-purple-600 mt-1">
                                    Your Commission: GHS {editingProduct?.commission.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <Label htmlFor="new-markup">New Markup (%)</Label>
                                <Input
                                  id="new-markup"
                                  type="number"
                                  step="1"
                                  defaultValue={editingProduct?.markup}
                                  onChange={(e) => {
                                    const newMarkup = parseInt(e.target.value) || 0;
                                    const newCustomerPrice = parseFloat((product.basePrice * (1 + newMarkup / 100)).toFixed(2));
                                    const newCommission = parseFloat((newCustomerPrice - product.basePrice).toFixed(2));
                                    setEditingProduct({
                                      ...product,
                                      markup: newMarkup,
                                      customerPrice: newCustomerPrice,
                                      commission: newCommission,
                                    });
                                  }}
                                />
                              </div>
                              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-sm text-slate-600">New Customer Price:</p>
                                <p className="text-lg font-bold text-green-600">GHS {editingProduct?.customerPrice.toFixed(2)}</p>
                                <p className="text-sm text-slate-600 mt-2">New Commission:</p>
                                <p className="text-lg font-bold text-purple-600">GHS {editingProduct?.commission.toFixed(2)}</p>
                              </div>
                              <Button
                                onClick={() => editingProduct && handleEditPrice(product, editingProduct.markup)}
                                className="w-full bg-blue-500 hover:bg-blue-600"
                              >
                                Update Price
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>

                        {!product.isDefault && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="flex-1 gap-2"
                                onClick={() => setDeletingProduct(product)}
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Product</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{product.name}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <div className="flex gap-3">
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deletingProduct && handleDeleteProduct(deletingProduct)}
                                  className="bg-red-500 hover:bg-red-600"
                                >
                                  Delete
                                </AlertDialogAction>
                              </div>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-600 mb-4">No products available for {network}</p>
                  <Button onClick={() => setIsAddingProduct(true)} className="bg-green-500 hover:bg-green-600">
                    Add Custom Product
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Info Section */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-base">How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-700">
            <p>
              <strong>Default Products:</strong> Pre-configured packages with 10% markup. Toggle them on/off to control what customers see.
            </p>
            <p>
              <strong>Custom Products:</strong> Create your own packages with custom markup percentages to maximize your commission.
            </p>
            <p>
              <strong>Commission:</strong> The difference between customer price and base price is your commission, credited to your account when orders are placed.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
