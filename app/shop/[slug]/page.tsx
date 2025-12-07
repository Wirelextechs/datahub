'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Check, Phone, Mail, AlertCircle, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Product {
  id: string;
  name: string;
  network: string;
  size: string;
  validity: string;
  basePrice: number;
  profitMargin: number;
  sellingPrice: number;
}

interface BuyFormData {
  beneficiaryNumber: string;
  email: string;
  productId: string;
}

// Ghana network-specific validation patterns with correct prefixes
const NETWORK_PATTERNS: Record<string, { prefixes: string[]; length: number; description: string }> = {
  MTN: {
    prefixes: ['024', '025', '053', '054', '055', '059'],
    length: 10,
    description: 'MTN numbers start with 024, 025, 053, 054, 055, or 059 (e.g., 0241234567)',
  },
  AirtelTigo: {
    prefixes: ['027', '057', '026', '056'],
    length: 10,
    description: 'AirtelTigo numbers start with 027, 057, 026, or 056 (e.g., 0271234567)',
  },
  Telecel: {
    prefixes: ['020', '050'],
    length: 10,
    description: 'Telecel numbers start with 020 or 050 (e.g., 0201234567)',
  },
};

// Mock shop data - in production, this would come from a database
const SHOP_DATA = {
  'my-data-shop': {
    name: 'My Data Shop',
    description: 'Quality data packages at affordable prices',
    owner: 'Prosper Wedam',
    products: [
      {
        id: 'prod-1',
        name: '1GB Data Package',
        network: 'MTN',
        size: '1GB',
        validity: 'NON EXPIRE',
        basePrice: 4.55,
        profitMargin: 0.45,
        sellingPrice: 5.00,
      },
      {
        id: 'prod-2',
        name: '2GB Data Package',
        network: 'MTN',
        size: '2GB',
        validity: 'NON EXPIRE',
        basePrice: 9.09,
        profitMargin: 0.91,
        sellingPrice: 10.00,
      },
      {
        id: 'prod-3',
        name: '3GB Data Package',
        network: 'AirtelTigo',
        size: '3GB',
        validity: 'NON EXPIRE',
        basePrice: 13.64,
        profitMargin: 1.36,
        sellingPrice: 15.00,
      },
      {
        id: 'prod-4',
        name: '5GB Data Package',
        network: 'Telecel',
        size: '5GB',
        validity: 'NON EXPIRE',
        basePrice: 22.73,
        profitMargin: 2.27,
        sellingPrice: 25.00,
      },
      {
        id: 'prod-5',
        name: '1GB Data Package',
        network: 'MTN',
        size: '1GB',
        validity: 'NON EXPIRE',
        basePrice: 4.55,
        profitMargin: 0.75,
        sellingPrice: 5.30,
      },
    ] as Product[],
  },
};

export default function PublicShopPage({ params }: { params: { slug: string } }) {
  const shopSlug = params.slug;
  const shopData = SHOP_DATA[shopSlug as keyof typeof SHOP_DATA];

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isBuyDialogOpen, setIsBuyDialogOpen] = useState(false);
  const [formData, setFormData] = useState<BuyFormData>({
    beneficiaryNumber: '',
    email: '',
    productId: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!shopData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Shop Not Found</h1>
          <p className="text-gray-400">The shop you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  const networkColors: Record<string, { gradient: string; bg: string }> = {
    MTN: { gradient: 'from-yellow-400 to-yellow-600', bg: 'bg-yellow-50' },
    AirtelTigo: { gradient: 'from-blue-400 to-blue-600', bg: 'bg-blue-50' },
    Telecel: { gradient: 'from-red-400 to-red-600', bg: 'bg-red-50' },
  };

  // Validate beneficiary number based on network with correct Ghana prefixes
  const validateBeneficiaryNumber = (number: string, network: string): { valid: boolean; error?: string } => {
    if (!number.trim()) {
      return { valid: false, error: 'Please enter a beneficiary number' };
    }

    // Check for country code (starts with +, 00, or 233)
    if (number.startsWith('+') || number.startsWith('00') || number.startsWith('233')) {
      return {
        valid: false,
        error: 'Please remove the country code. Enter only the local number (e.g., 0241234567)',
      };
    }

    const networkPattern = NETWORK_PATTERNS[network];
    if (!networkPattern) {
      return { valid: false, error: 'Invalid network' };
    }

    // Check length
    if (number.length !== networkPattern.length) {
      return {
        valid: false,
        error: `${network} numbers must be exactly ${networkPattern.length} digits long`,
      };
    }

    // Check if all characters are digits
    if (!/^\d+$/.test(number)) {
      return {
        valid: false,
        error: 'Beneficiary number must contain only digits',
      };
    }

    // Check if number starts with one of the valid prefixes for the network
    const hasValidPrefix = networkPattern.prefixes.some(prefix => number.startsWith(prefix));
    if (!hasValidPrefix) {
      const prefixList = networkPattern.prefixes.join(', ');
      return {
        valid: false,
        error: `${network} numbers must start with ${prefixList}. ${networkPattern.description}`,
      };
    }

    return { valid: true };
  };

  // Auto-clean beneficiary number (remove spaces)
  const handleBeneficiaryNumberChange = (value: string) => {
    // Remove all spaces
    const cleanedValue = value.replace(/\s+/g, '');
    setFormData({ ...formData, beneficiaryNumber: cleanedValue });
  };

  const handleBuyClick = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      beneficiaryNumber: '',
      email: '',
      productId: product.id,
    });
    setSuccessMessage('');
    setErrorMessage('');
    setIsBuyDialogOpen(true);
  };

  const validateForm = (): boolean => {
    if (!selectedProduct) {
      setErrorMessage('Product not found');
      return false;
    }

    // Validate beneficiary number with network-specific rules
    const beneficiaryValidation = validateBeneficiaryNumber(
      formData.beneficiaryNumber,
      selectedProduct.network
    );
    if (!beneficiaryValidation.valid) {
      setErrorMessage(beneficiaryValidation.error || 'Invalid beneficiary number');
      return false;
    }

    if (!formData.email.trim()) {
      setErrorMessage('Please enter an email address');
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleProceedToPayment = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setSuccessMessage(
        `Order confirmed! Sending ${selectedProduct?.name} to ${formData.beneficiaryNumber}. You will be redirected to payment for GHS ${selectedProduct?.sellingPrice.toFixed(2)}`
      );

      // In production, this would redirect to a payment gateway
      setTimeout(() => {
        setIsBuyDialogOpen(false);
        // Redirect to payment gateway
        // window.location.href = '/payment?orderId=...';
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-20 w-80 h-80 bg-gradient-to-tr from-cyan-500/20 to-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-2">{shopData.name}</h1>
            <p className="text-gray-400 mb-4">{shopData.description}</p>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-400">Shop Active</span>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {shopData.products.map((product) => {
              const colors = networkColors[product.network] || networkColors.MTN;
              return (
                <Card
                  key={product.id}
                  className="p-6 border-0 shadow-lg bg-slate-800/50 backdrop-blur-xl hover:shadow-xl transition-all hover:scale-105"
                >
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${colors.gradient} text-white mb-4 w-fit`}>
                    <ShoppingCart className="w-6 h-6" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{product.network}</p>

                  <div className="space-y-3 mb-6">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Size</p>
                      <p className="text-lg font-bold text-white">{product.size}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400 mb-1">Price</p>
                      <p className="text-2xl font-bold text-white">GHS {product.sellingPrice.toFixed(2)}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400 mb-1">Validity</p>
                      <p className="text-sm text-white flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-400" />
                        {product.validity}
                      </p>
                    </div>
                  </div>

                  <Dialog open={isBuyDialogOpen && selectedProduct?.id === product.id} onOpenChange={setIsBuyDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => handleBuyClick(product)}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                      >
                        Buy Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Buy {selectedProduct?.name}</DialogTitle>
                        <DialogDescription>
                          Enter your details to proceed with the purchase
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4">
                        {/* Error Message */}
                        {errorMessage && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{errorMessage}</AlertDescription>
                          </Alert>
                        )}

                        {/* Success Message */}
                        {successMessage && (
                          <Alert className="bg-green-50 border-green-200">
                            <Check className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
                          </Alert>
                        )}{/* Beneficiary Number Input */}
                        <div>
                          <Label htmlFor="beneficiary" className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            Beneficiary Number
                          </Label>
                          <Input
                            id="beneficiary"
                            type="tel"
                            placeholder={`e.g., ${NETWORK_PATTERNS[selectedProduct?.network || 'MTN']?.prefixes[0]}1234567`}
                            value={formData.beneficiaryNumber}
                            onChange={(e) => handleBeneficiaryNumberChange(e.target.value)}
                            className="mt-1"
                            disabled={isProcessing}
                            maxLength={10}
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            ✓ Spaces will be automatically removed
                            <br />
                            ✗ Do not include country code (+233 or 00)
                          </p>
                        </div>

                        {/* Email Input */}
                        <div>
                          <Label htmlFor="email" className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            className="mt-1"
                            disabled={isProcessing}
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            We&apos;ll send the receipt and confirmation to this email
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-4">
                          <Button
                            onClick={handleProceedToPayment}
                            disabled={isProcessing}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            {isProcessing ? 'Processing...' : 'Proceed to Payment'}
                          </Button>
                          <Button
                            onClick={() => setIsBuyDialogOpen(false)}
                            variant="outline"
                            disabled={isProcessing}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </Card>
              );
            })}
          </div>

          {/* Info Section */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-0 shadow-lg bg-slate-800/50 backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white mb-2">⚡ Instant Delivery</h3>
              <p className="text-gray-400">Data is delivered instantly to your phone</p>
            </Card>
            <Card className="p-6 border-0 shadow-lg bg-slate-800/50 backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white mb-2">🔒 Secure Payment</h3>
              <p className="text-gray-400">All transactions are encrypted and secure</p>
            </Card>
            <Card className="p-6 border-0 shadow-lg bg-slate-800/50 backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white mb-2">✅ 24/7 Support</h3>
              <p className="text-gray-400">Get help anytime you need it</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
