"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreditCard, Calendar, User, Mail, Building } from "lucide-react";
import { useAuth } from "@/store";

interface PricingFormProps {
  service: {
    name: string;
    plan: string;
    price: number;
    billing: "monthly" | "yearly";
    features: string[];
  };
  open: boolean;
  onClose: () => void;
}

export function PricingForm({ service, open, onClose }: PricingFormProps) {
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    name: user?.name || "",
    company: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 2000);
  };

  const total = service.price;
  const tax = Math.round(total * 0.1);
  const finalTotal = total + tax;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden p-0">
        <DialogHeader className="px-8 py-6 border-b">
          <DialogTitle className="text-2xl font-bold">Complete Your Purchase</DialogTitle>
        </DialogHeader>
        
        <div className="overflow-y-auto max-h-[80vh] px-8 py-6">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Order Summary - Takes 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
                <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-lg">{service.name}</span>
                    <Badge variant="secondary" className="text-sm">{service.plan}</Badge>
                  </div>
                  <div className="text-muted-foreground">
                    Billing: <span className="font-medium">{service.billing}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Included Features:</h4>
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <hr className="my-4" />
                  <div className="space-y-3">
                    <div className="flex justify-between text-lg">
                      <span>Subtotal</span>
                      <span>${service.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (10%)</span>
                      <span>${tax}</span>
                    </div>
                    <div className="flex justify-between font-bold text-xl border-t pt-3">
                      <span>Total</span>
                      <span>${finalTotal}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Form - Takes 3 columns */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-6">Payment Information</h3>
                  
                  <div className="mb-8">
                    <Label className="text-base font-medium mb-4 block">Payment Method</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer text-base">
                          <CreditCard className="h-5 w-5" />
                          Credit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="cursor-pointer text-base">PayPal</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name" className="flex items-center gap-2 mb-3 text-base font-medium">
                            <User className="h-4 w-4" />
                            Full Name
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                            className="h-14 text-base"
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="flex items-center gap-2 mb-3 text-base font-medium">
                            <Mail className="h-4 w-4" />
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                            className="h-14 text-base"
                            placeholder="Enter your email"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="company" className="flex items-center gap-2 mb-3 text-base font-medium">
                          <Building className="h-4 w-4" />
                          Company (Optional)
                        </Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          className="h-14 text-base"
                          placeholder="Enter your company name"
                        />
                      </div>

                      <div>
                        <Label htmlFor="cardNumber" className="mb-3 block text-base font-medium">
                          Card Number
                        </Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                          required
                          className="h-14 text-base"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="expiryDate" className="flex items-center gap-2 mb-3 text-base font-medium">
                            <Calendar className="h-4 w-4" />
                            Expiry Date
                          </Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                            required
                            className="h-14 text-base"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv" className="mb-3 block text-base font-medium">
                            CVV
                          </Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                            required
                            className="h-14 text-base"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t">
                  <Button
                    type="submit"
                    className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={loading}
                  >
                    {loading ? "Processing Payment..." : `Pay $${finalTotal}`}
                  </Button>

                  <div className="text-center mt-6 text-sm text-muted-foreground">
                    🔒 Your payment information is secure and encrypted with 256-bit SSL
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}