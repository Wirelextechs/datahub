'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit2, Trash2, Eye, Plus, DollarSign } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  size: string;
  customerPrice: number;
  profitMargin: number;
  network: 'MTN' | 'AT' | 'Telecel';
  validity: string;
  image?: string;
}

interface Shop {
  name: string;
  description: string;
  logo?: string;
  banner?: string;
  isActive: boolean;
}

export default function MyShopPage() {
  const [shop, setShop] = useState<Shop>({
    name: 'My Data Shop',
    description: 'Quality data packages at affordable prices',
    isActive: true,
  });

  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: '1GB Data Package',
      size: '1GB',
      customerPrice: 5.0,
      profitMargin: 0.5,
      network: 'MTN',
      validity: 'NON EXPIRE',
    },
    {
      id: '2',
      name: '2GB Data Package',
      size: '2GB',
      customerPrice: 10.0,
      profitMargin: 1.0,
      network: 'MTN',
      validity: 'NON EXPIRE',
    },
    {
      id: '3',
      name: '3GB Data Package',
      size: '3GB',
      customerPrice: 15.0,
      profitMargin: 1.5,
      network: 'AT',
      validity: 'NON EXPIRE',
    },
    {
      id: '4',
      name: '5GB Data Package',
      size: '5GB',
      customerPrice: 25.0,
      profitMargin: 2.5,
      network: 'Telecel',
      validity: 'NON EXPIRE',
    },
  ]);

  const [selectedNetwork, setSelectedNetwork] = useState<'MTN' | 'AT' | 'Telecel' | 'All'>('All');
  const [editShopOpen, setEditShopOpen] = useState(false);
  const [editPriceOpen, setEditPriceOpen] = useState(false);
  const [editProductOpen, setEditProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editedShop, setEditedShop] = useState<Shop>(shop);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);

  const filteredProducts = selectedNetwork === 'All' 
    ? products 
    : products.filter(p => p.network === selectedNetwork);

  const handleEditShop = () => {
    setEditedShop(shop);
    setEditShopOpen(true);
  };

  const handleSaveShop = () => {
    setShop(editedShop);
    setEditShopOpen(false);
    alert('Shop information updated successfully');
  };

  const handleEditPrice = (product: Product) => {
    setSelectedProduct(product);
    setEditedProduct({ ...product });
    setEditPriceOpen(true);
  };

  const handleSavePrice = () => {
    if (editedProduct) {
      setProducts(products.map(p => p.id === editedProduct.id ? editedProduct : p));
      setEditPriceOpen(false);
      alert('Product price updated successfully');
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditedProduct({ ...product });
    setEditProductOpen(true);
  };

  const handleSaveProduct = () => {
    if (editedProduct) {
      setProducts(products.map(p => p.id === editedProduct.id ? editedProduct : p));
      setEditProductOpen(false);
      alert('Product updated successfully');
    }
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    alert('Product deleted successfully');
  };

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: 'New Product',
      size: '1GB',
      customerPrice: 5.0,
      profitMargin: 0.5,
      network: 'MTN',
      validity: 'NON EXPIRE',
    };
    setEditedProduct(newProduct);
    setEditProductOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Shop Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{shop.name}</h1>
          <p className="text-gray-600 mt-1">{shop.description}</p>
          <div className="mt-2">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              shop.isActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {shop.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
        <Button onClick={handleEditShop} className="bg-blue-600 hover:bg-blue-700">
          <Edit2 className="w-4 h-4 mr-2" />
          Edit Shop
        </Button>
      </div>

      {/* Edit Shop Dialog */}
      <Dialog open={editShopOpen} onOpenChange={setEditShopOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Shop Information</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="shop-name">Shop Name</Label>
              <Input
                id="shop-name"
                value={editedShop.name}
                onChange={(e) => setEditedShop({ ...editedShop, name: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="shop-description">Shop Description</Label>
              <Textarea
                id="shop-description"
                value={editedShop.description}
                onChange={(e) => setEditedShop({ ...editedShop, description: e.target.value })}
                className="mt-1"
                rows={4}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="shop-active"
                checked={editedShop.isActive}
                onChange={(e) => setEditedShop({ ...editedShop, isActive: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="shop-active">Shop is Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditShopOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveShop} className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Products Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Products</h2>
          <Button onClick={handleAddProduct} className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Network Tabs */}
        <Tabs value={selectedNetwork} onValueChange={(value) => setSelectedNetwork(value as any)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="MTN">MTN</TabsTrigger>
            <TabsTrigger value="AT">AirtelTigo</TabsTrigger>
            <TabsTrigger value="Telecel">Telecel</TabsTrigger>
          </TabsList>

          {['All', 'MTN', 'AT', 'Telecel'].map((network) => (
            <TabsContent key={network} value={network} className="space-y-4">
              {filteredProducts.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center text-gray-500">
                    No products available for {network === 'All' ? 'this network' : network}
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <CardDescription>{product.network}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-600">Size</p>
                            <p className="font-semibold">{product.size}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Validity</p>
                            <p className="font-semibold">{product.validity}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Customer Price</p>
                            <p className="font-semibold text-green-600">GHS {product.customerPrice.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Your Profit</p>
                            <p className="font-semibold text-blue-600">GHS {product.profitMargin.toFixed(2)}</p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditPrice(product)}
                            className="flex-1"
                          >
                            <DollarSign className="w-4 h-4 mr-1" />
                            Edit Price
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditProduct(product)}
                            className="flex-1"
                          >
                            <Edit2 className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Edit Price Dialog */}
      <Dialog open={editPriceOpen} onOpenChange={setEditPriceOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Edit Product Price</DialogTitle>
          </DialogHeader>
          {editedProduct && (
            <div className="space-y-4">
              <div>
                <Label>Product</Label>
                <p className="text-sm text-gray-600 mt-1">{editedProduct.name}</p>
              </div>
              <div>
                <Label htmlFor="customer-price">Customer Price (GHS)</Label>
                <Input
                  id="customer-price"
                  type="number"
                  step="0.01"
                  value={editedProduct.customerPrice}
                  onChange={(e) => setEditedProduct({ ...editedProduct, customerPrice: parseFloat(e.target.value) })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="profit-margin">Your Profit Margin (GHS)</Label>
                <Input
                  id="profit-margin"
                  type="number"
                  step="0.01"
                  value={editedProduct.profitMargin}
                  onChange={(e) => setEditedProduct({ ...editedProduct, profitMargin: parseFloat(e.target.value) })}
                  className="mt-1"
                />
              </div>
              <div className="bg-blue-50 p-3 rounded text-sm">
                <p className="text-gray-600">Total Price: <span className="font-semibold">GHS {(editedProduct.customerPrice + editedProduct.profitMargin).toFixed(2)}</span></p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditPriceOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePrice} className="bg-blue-600 hover:bg-blue-700">
              Save Price
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={editProductOpen} onOpenChange={setEditProductOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {editedProduct && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="product-name">Product Name</Label>
                <Input
                  id="product-name"
                  value={editedProduct.name}
                  onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="product-size">Size</Label>
                <Input
                  id="product-size"
                  value={editedProduct.size}
                  onChange={(e) => setEditedProduct({ ...editedProduct, size: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="product-network">Network</Label>
                <select
                  id="product-network"
                  value={editedProduct.network}
                  onChange={(e) => setEditedProduct({ ...editedProduct, network: e.target.value as any })}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="MTN">MTN</option>
                  <option value="AT">AirtelTigo</option>
                  <option value="Telecel">Telecel</option>
                </select>
              </div>
              <div>
                <Label htmlFor="product-validity">Validity</Label>
                <Input
                  id="product-validity"
                  value={editedProduct.validity}
                  onChange={(e) => setEditedProduct({ ...editedProduct, validity: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditProductOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProduct} className="bg-blue-600 hover:bg-blue-700">
              Save Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
