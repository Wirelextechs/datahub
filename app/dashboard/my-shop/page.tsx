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
import { Edit, Trash2, Plus, DollarSign, Percent, Copy, Share2, Eye, TrendingUp, Zap } from 'lucide-react';

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

interface ShopInfo {
  name: string;
  description: string;
  slug: string;
  status: 'Active' | 'Inactive';
  shopUrl: string;
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

  // Shop Info State
  const [shopInfo, setShopInfo] = useState<ShopInfo>({
    name: 'My Data Shop',
    description: 'Quality data packages at affordable prices',
    slug: 'techs-cre5sx1',
    status: 'Active',
    shopUrl: 'https://datahub.shop/techs-cre5sx1',
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

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.size || newProduct.basePrice <= 0) {
      alert('Please fill in all fields');
      return;
    }

    const customerPrice = parseFloat((newProduct.basePrice * (1 + newProduct.markup / 100)).toFixed(2));
    const commission = parseFloat((newProduct.basePrice * (newProduct.markup / 100)).toFixed(2));

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

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSaveEdit = () => {
    if (!editingProduct) return;

    const customerPrice = parseFloat((editingProduct.basePrice * (1 + editingProduct.markup / 100)).toFixed(2));
    const commission = parseFloat((editingProduct.basePrice * (editingProduct.markup / 100)).toFixed(2));

    setProducts(products.map(p =>
      p.id === editingProduct.id
        ? { ...editingProduct, customerPrice, commission }
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
    setShopInfo(editingShopInfo);
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
              <CardDescription>Pre-configured packages with 10% markup (your commission)</CardDescription>
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
                    <Percent className="w-4 h-4 text-orange-500" />
                    <span className="font-medium text-orange-600">{product.markup}%</span>
                  </div>

                  <div className="border-t pt-2">
                    <p className="text-gray-600">Customer Price:</p>
                    <p className="font-bold text-green-600">GHS {product.customerPrice.toFixed(2)}</p>
                  </div>

                  <div>
                    <p className="text-gray-600">Your Commission:</p>
                    <p className="font-bold text-purple-600">GHS {product.commission.toFixed(2)}</p>
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
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Custom Product</DialogTitle>
                  <DialogDescription>
                    Create a new custom product with your desired markup
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input
                      id="product-name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="e.g., Premium 10GB Package"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
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
                        value={newProduct.size}
                        onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
                        placeholder="e.g., 10GB"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="base-price">Base Price (GHS)</Label>
                      <Input
                        id="base-price"
                        type="number"
                        step="0.01"
                        value={newProduct.basePrice}
                        onChange={(e) => setNewProduct({ ...newProduct, basePrice: parseFloat(e.target.value) || 0 })}
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <Label htmlFor="markup">Markup (%)</Label>
                      <Input
                        id="markup"
                        type="number"
                        step="0.1"
                        value={newProduct.markup}
                        onChange={(e) => setNewProduct({ ...newProduct, markup: parseFloat(e.target.value) || 0 })}
                        placeholder="10"
                      />
                    </div>
                  </div>

                  {newProduct.basePrice > 0 && (
                    <div className="bg-blue-50 p-3 rounded-lg text-sm">
                      <p className="text-gray-600">Customer Price: <span className="font-bold text-green-600">GHS {(newProduct.basePrice * (1 + newProduct.markup / 100)).toFixed(2)}</span></p>
                      <p className="text-gray-600">Your Commission: <span className="font-bold text-purple-600">GHS {(newProduct.basePrice * (newProduct.markup / 100)).toFixed(2)}</span></p>
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
                      <Percent className="w-4 h-4 text-orange-500" />
                      <span className="font-medium text-orange-600">{product.markup}%</span>
                    </div>

                    <div className="border-t pt-2">
                      <p className="text-gray-600">Customer Price:</p>
                      <p className="font-bold text-green-600">GHS {product.customerPrice.toFixed(2)}</p>
                    </div>

                    <div>
                      <p className="text-gray-600">Your Commission:</p>
                      <p className="font-bold text-purple-600">GHS {product.commission.toFixed(2)}</p>
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
                                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="edit-base-price">Base Price</Label>
                                  <Input
                                    id="edit-base-price"
                                    type="number"
                                    step="0.01"
                                    value={editingProduct.basePrice}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, basePrice: parseFloat(e.target.value) || 0 })}
                                  />
                                </div>

                                <div>
                                  <Label htmlFor="edit-markup">Markup (%)</Label>
                                  <Input
                                    id="edit-markup"
                                    type="number"
                                    step="0.1"
                                    value={editingProduct.markup}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, markup: parseFloat(e.target.value) || 0 })}
                                  />
                                </div>
                              </div>

                              {editingProduct.basePrice > 0 && (
                                <div className="bg-blue-50 p-3 rounded-lg text-sm">
                                  <p className="text-gray-600">Customer Price: <span className="font-bold text-green-600">GHS {(editingProduct.basePrice * (1 + editingProduct.markup / 100)).toFixed(2)}</span></p>
                                  <p className="text-gray-600">Your Commission: <span className="font-bold text-purple-600">GHS {(editingProduct.basePrice * (editingProduct.markup / 100)).toFixed(2)}</span></p>
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
