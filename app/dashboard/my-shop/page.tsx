'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Edit, Trash2, Plus, DollarSign, Copy, Share2, Eye, TrendingUp, Zap } from 'lucide-react';

interface BaseProduct {
  id: string;
  name: string;
  network: string;
  size: string;
  validity: string;
  basePrice: number;
}

interface Product {
  id: string;
  name: string;
  network: string;
  size: string;
  validity: string;
  basePrice: number;
  profitMargin: number;
  sellingPrice: number;
  isDefault: boolean;
}

interface ShopInfo {
  name: string;
  description: string;
  slug: string;
  status: 'Active' | 'Inactive';
  shopUrl: string;
}

const BASE_PRODUCTS: BaseProduct[] = [
  {
    id: 'base-1',
    name: '1GB Data Package',
    network: 'MTN',
    size: '1GB',
    validity: 'NON EXPIRE',
    basePrice: 4.55,
  },
  {
    id: 'base-2',
    name: '2GB Data Package',
    network: 'MTN',
    size: '2GB',
    validity: 'NON EXPIRE',
    basePrice: 9.09,
  },
  {
    id: 'base-3',
    name: '3GB Data Package',
    network: 'AirtelTigo',
    size: '3GB',
    validity: 'NON EXPIRE',
    basePrice: 13.64,
  },
  {
    id: 'base-4',
    name: '5GB Data Package',
    network: 'Telecel',
    size: '5GB',
    validity: 'NON EXPIRE',
    basePrice: 22.73,
  },
];

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'default-1',
    name: '1GB Data Package',
    network: 'MTN',
    size: '1GB',
    validity: 'NON EXPIRE',
    basePrice: 4.55,
    profitMargin: 0.45,
    sellingPrice: 5.00,
    isDefault: true,
  },
  {
    id: 'default-2',
    name: '2GB Data Package',
    network: 'MTN',
    size: '2GB',
    validity: 'NON EXPIRE',
    basePrice: 9.09,
    profitMargin: 0.91,
    sellingPrice: 10.00,
    isDefault: true,
  },
  {
    id: 'default-3',
    name: '3GB Data Package',
    network: 'AirtelTigo',
    size: '3GB',
    validity: 'NON EXPIRE',
    basePrice: 13.64,
    profitMargin: 1.36,
    sellingPrice: 15.00,
    isDefault: true,
  },
  {
    id: 'default-4',
    name: '5GB Data Package',
    network: 'Telecel',
    size: '5GB',
    validity: 'NON EXPIRE',
    basePrice: 22.73,
    profitMargin: 2.27,
    sellingPrice: 25.00,
    isDefault: true,
  },
];

// Helper function to generate slug from shop name
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .substring(0, 20);
};

export default function MyShopPage() {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [defaultProductsEnabled, setDefaultProductsEnabled] = useState(true);
  const [selectedNetwork, setSelectedNetwork] = useState('All');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [selectedBaseNetwork, setSelectedBaseNetwork] = useState('MTN');
  const [selectedBaseProduct, setSelectedBaseProduct] = useState<BaseProduct | null>(null);
  const [profitMarginAmount, setProfitMarginAmount] = useState(0);

  // Shop Info State
  const [shopInfo, setShopInfo] = useState<ShopInfo>({
    name: 'My Data Shop',
    description: 'Quality data packages at affordable prices',
    slug: 'my-data-shop',
    status: 'Active',
    shopUrl: 'https://datahub.shop/my-data-shop',
  });

  const [editingShopInfo, setEditingShopInfo] = useState<ShopInfo>(shopInfo);
  const [isEditingShop, setIsEditingShop] = useState(false);

  // Shop Statistics
  const [shopStats] = useState({
    totalVisits: 1234,
    totalSales: 156,
    commissionRate: 12.6,
  });

  const networks = ['All', 'MTN', 'AirtelTigo', 'Telecel'];

  const filteredProducts = selectedNetwork === 'All'
    ? products.filter(p => !p.isDefault || defaultProductsEnabled)
    : products.filter(p => p.network === selectedNetwork && (!p.isDefault || defaultProductsEnabled));

  // Get base products for selected network
  const baseProductsForNetwork = BASE_PRODUCTS.filter(p => p.network === selectedBaseNetwork);

  const handleAddProduct = () => {
    if (!selectedBaseProduct || profitMarginAmount < 0) {
      alert('Please select a product and enter a valid profit margin');
      return;
    }

    const sellingPrice = parseFloat((selectedBaseProduct.basePrice + profitMarginAmount).toFixed(2));

    const product: Product = {
      id: `custom-${Date.now()}`,
      name: selectedBaseProduct.name,
      network: selectedBaseProduct.network,
      size: selectedBaseProduct.size,
      validity: selectedBaseProduct.validity,
      basePrice: selectedBaseProduct.basePrice,
      profitMargin: profitMarginAmount,
      sellingPrice,
      isDefault: false,
    };

    setProducts([...products, product]);
    setSelectedBaseProduct(null);
    setProfitMarginAmount(0);
    setIsAddingProduct(false);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSaveEdit = () => {
    if (!editingProduct) return;

    const sellingPrice = parseFloat((editingProduct.basePrice + editingProduct.profitMargin).toFixed(2));

    setProducts(products.map(p =>
      p.id === editingProduct.id
        ? { ...editingProduct, sellingPrice }
        : p
    ));
    setEditingProduct(null);
  };

  const handleDeleteProduct = (product: Product) => {
    setDeletingProduct(product);
  };

  const confirmDelete = () => {
    if (!deletingProduct) return;
    setProducts(products.filter(p => p.id !== deletingProduct.id));
    setDeletingProduct(null);
  };

  const handleSaveShopInfo = () => {
    const newSlug = generateSlug(editingShopInfo.name);
    const newShopUrl = `https://datahub.shop/${newSlug}`;
    
    const updatedShopInfo = {
      ...editingShopInfo,
      slug: newSlug,
      shopUrl: newShopUrl,
    };
    
    setShopInfo(updatedShopInfo);
    setIsEditingShop(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const defaultProductsCount = products.filter(p => p.isDefault).length;
  const customProductsCount = products.filter(p => !p.isDefault).length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">My Shop</h1>
        <p className="text-gray-600">Manage your personal data shop and storefront</p>
      </div>

      {/* Your Shop Link Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Your Shop Link
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg border border-blue-200">
            <Input
              value={shopInfo.shopUrl}
              readOnly
              className="flex-1 border-0 bg-transparent"
            />
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyToClipboard(shopInfo.shopUrl)}
              className="gap-2"
            >
              <Copy className="w-4 h-4" />
              Copy
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
          <p className="text-xs text-gray-500">Your shop link is automatically generated from your shop name</p>
        </CardContent>
      </Card>

      {/* Shop Status Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Shop Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-semibold text-green-600">{shopInfo.status}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Shop Slug</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-sm">{shopInfo.slug}</p>
          </CardContent>
        </Card>
      </div>

      {/* Shop Customization Section */}
      <Card>
        <CardHeader>
          <CardTitle>Shop Customization</CardTitle>
          <CardDescription>Customize your shop name and description</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isEditingShop ? (
            <>
              <div>
                <Label className="text-gray-600">Shop Name</Label>
                <p className="font-semibold mt-1">{shopInfo.name}</p>
              </div>
              <div>
                <Label className="text-gray-600">Shop Description</Label>
                <p className="text-gray-700 mt-1">{shopInfo.description}</p>
              </div>
              <Button
                onClick={() => {
                  setEditingShopInfo(shopInfo);
                  setIsEditingShop(true);
                }}
                className="gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Shop Info
              </Button>
            </>
          ) : (
            <>
              <div>
                <Label htmlFor="shop-name">Shop Name</Label>
                <Input
                  id="shop-name"
                  value={editingShopInfo.name}
                  onChange={(e) => setEditingShopInfo({ ...editingShopInfo, name: e.target.value })}
                  placeholder="Enter your shop name"
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">Shop slug will be auto-generated from this name</p>
              </div>
              <div>
                <Label htmlFor="shop-description">Shop Description</Label>
                <textarea
                  id="shop-description"
                  value={editingShopInfo.description}
                  onChange={(e) => setEditingShopInfo({ ...editingShopInfo, description: e.target.value })}
                  placeholder="Describe your shop"
                  className="w-full mt-1 p-2 border rounded-md"
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveShopInfo} className="bg-blue-600 hover:bg-blue-700">
                  Save Changes
                </Button>
                <Button
                  onClick={() => setIsEditingShop(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Shop Statistics Section */}
      <Card>
        <CardHeader>
          <CardTitle>Shop Statistics</CardTitle>
          <CardDescription>Your shop performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Visits</p>
                  <p className="text-2xl font-bold text-blue-600">{shopStats.totalVisits.toLocaleString()}</p>
                </div>
                <Eye className="w-8 h-8 text-blue-400" />
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Sales</p>
                  <p className="text-2xl font-bold text-green-600">{shopStats.totalSales}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Commission Rate</p>
                  <p className="text-2xl font-bold text-purple-600">{shopStats.commissionRate}%</p>
                </div>
                <Zap className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Default Products Section */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Default Products</CardTitle>
              <CardDescription>Pre-configured packages with 10% profit margin (your commission)</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {defaultProductsEnabled ? 'Enabled' : 'Disabled'}
              </span>
              <Switch
                checked={defaultProductsEnabled}
                onCheckedChange={setDefaultProductsEnabled}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!defaultProductsEnabled && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-sm text-yellow-800">
              ⚠️ Default products are currently disabled. Enable them to make them available to customers.
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {DEFAULT_PRODUCTS.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-sm">{product.name}</h3>
                    <p className="text-xs text-gray-600">{product.network}</p>
                  </div>
                  <Badge variant="secondary">Default</Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-gray-600">Size:</p>
                    <p className="font-medium">{product.size}</p>
                  </div>

                  <div>
                    <p className="text-gray-600">Base Price:</p>
                    <p className="font-medium">GHS {product.basePrice.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-orange-500" />
                    <span className="font-medium text-orange-600">+GHS {product.profitMargin.toFixed(2)}</span>
                  </div>

                  <div className="border-t pt-2">
                    <p className="text-gray-600">Selling Price:</p>
                    <p className="font-bold text-green-600">GHS {product.sellingPrice.toFixed(2)}</p>
                  </div>

                  <div>
                    <p className="text-gray-600">Your Profit:</p>
                    <p className="font-bold text-purple-600">GHS {product.profitMargin.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Products Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                {defaultProductsCount} default + {customProductsCount} custom products
              </CardDescription>
            </div>
            <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4" />
                  Add Custom Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add Custom Product</DialogTitle>
                  <DialogDescription>
                    Select a base product and add your profit margin in GHS
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {/* Step 1: Select Network */}
                  <div>
                    <Label htmlFor="network">Step 1: Select Network</Label>
                    <Select value={selectedBaseNetwork} onValueChange={setSelectedBaseNetwork}>
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

                  {/* Step 2: Select Base Product */}
                  <div>
                    <Label htmlFor="base-product">Step 2: Select Product</Label>
                    <Select 
                      value={selectedBaseProduct?.id || ''} 
                      onValueChange={(id) => {
                        const product = baseProductsForNetwork.find(p => p.id === id);
                        setSelectedBaseProduct(product || null);
                      }}
                    >
                      <SelectTrigger id="base-product">
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>
                      <SelectContent>
                        {baseProductsForNetwork.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name} - GHS {product.basePrice.toFixed(2)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Step 3: Add Profit Margin */}
                  {selectedBaseProduct && (
                    <div>
                      <Label htmlFor="profit-margin">Step 3: Add Profit Margin (GHS)</Label>
                      <Input
                        id="profit-margin"
                        type="number"
                        step="0.01"
                        min="0"
                        value={profitMarginAmount}
                        onChange={(e) => setProfitMarginAmount(parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                      />
                      <p className="text-xs text-gray-500 mt-1">Enter the amount you want to add as profit</p>
                    </div>
                  )}

                  {/* Preview */}
                  {selectedBaseProduct && profitMarginAmount >= 0 && (
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Product:</span>
                        <span className="font-semibold">{selectedBaseProduct.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Base Price:</span>
                        <span className="font-semibold">GHS {selectedBaseProduct.basePrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Profit Margin:</span>
                        <span className="font-semibold text-orange-600">+GHS {profitMarginAmount.toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between">
                        <span className="text-gray-600 font-semibold">Selling Price:</span>
                        <span className="font-bold text-green-600">GHS {(selectedBaseProduct.basePrice + profitMarginAmount).toFixed(2)}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button onClick={handleAddProduct} className="flex-1 bg-blue-600 hover:bg-blue-700">
                      Add Product
                    </Button>
                    <Button onClick={() => setIsAddingProduct(false)} variant="outline" className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Network Filter */}
          <div className="flex gap-2 flex-wrap">
            {networks.map((network) => (
              <Button
                key={network}
                variant={selectedNetwork === network ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedNetwork(network)}
              >
                {network}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className={`p-4 rounded-lg border ${product.isDefault ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-sm">{product.name}</h3>
                      <p className="text-xs text-gray-600">{product.network}</p>
                    </div>
                    <Badge variant={product.isDefault ? 'secondary' : 'outline'}>
                      {product.isDefault ? 'Default' : 'Custom'}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-gray-600">Size:</p>
                      <p className="font-medium">{product.size}</p>
                    </div>

                    <div>
                      <p className="text-gray-600">Base Price:</p>
                      <p className="font-medium">GHS {product.basePrice.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-orange-500" />
                      <span className="font-medium text-orange-600">+GHS {product.profitMargin.toFixed(2)}</span>
                    </div>

                    <div className="border-t pt-2">
                      <p className="text-gray-600">Selling Price:</p>
                      <p className="font-bold text-green-600">GHS {product.sellingPrice.toFixed(2)}</p>
                    </div>

                    <div>
                      <p className="text-gray-600">Your Profit:</p>
                      <p className="font-bold text-purple-600">GHS {product.profitMargin.toFixed(2)}</p>
                    </div>
                  </div>

                  {!product.isDefault && (
                    <div className="flex gap-2 mt-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 gap-2"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Product</DialogTitle>
                          </DialogHeader>
                          {editingProduct?.id === product.id && (
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="edit-name">Product Name</Label>
                                <Input
                                  id="edit-name"
                                  value={editingProduct.name}
                                  readOnly
                                  className="bg-gray-100"
                                />
                              </div>

                              <div>
                                <Label htmlFor="edit-base-price">Base Price</Label>
                                <Input
                                  id="edit-base-price"
                                  type="number"
                                  step="0.01"
                                  value={editingProduct.basePrice}
                                  readOnly
                                  className="bg-gray-100"
                                />
                              </div>

                              <div>
                                <Label htmlFor="edit-profit-margin">Profit Margin (GHS)</Label>
                                <Input
                                  id="edit-profit-margin"
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  value={editingProduct.profitMargin}
                                  onChange={(e) => setEditingProduct({ ...editingProduct, profitMargin: parseFloat(e.target.value) || 0 })}
                                />
                              </div>

                              {editingProduct.basePrice > 0 && (
                                <div className="bg-blue-50 p-3 rounded-lg text-sm">
                                  <p className="text-gray-600">Selling Price: <span className="font-bold text-green-600">GHS {(editingProduct.basePrice + editingProduct.profitMargin).toFixed(2)}</span></p>
                                  <p className="text-gray-600">Your Profit: <span className="font-bold text-purple-600">GHS {editingProduct.profitMargin.toFixed(2)}</span></p>
                                </div>
                              )}

                              <div className="flex gap-2">
                                <Button onClick={handleSaveEdit} className="flex-1 bg-blue-600 hover:bg-blue-700">
                                  Save Changes
                                </Button>
                                <Button onClick={() => setEditingProduct(null)} variant="outline" className="flex-1">
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="flex-1 gap-2"
                            onClick={() => handleDeleteProduct(product)}
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </Button>
                        </DialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Product</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{product.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <div className="flex gap-2">
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                              Delete
                            </AlertDialogAction>
                          </div>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No products found for the selected network.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
