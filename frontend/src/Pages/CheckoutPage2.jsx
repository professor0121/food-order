"use client"

import { useState } from "react"
import { CreditCard, Lock, MapPin, Package, Truck, User } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

const orderItems = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 99.99,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "USB-C Charging Cable",
    price: 19.99,
    quantity: 2,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Phone Case - Clear",
    price: 24.99,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function Component() {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [sameAsShipping, setSameAsShipping] = useState(true)

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            <p className="mt-2 text-gray-600">Complete your order below</p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Left Column - Forms */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="firstName">First name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Street address</Label>
                    <Input id="address" placeholder="123 Main Street" />
                  </div>
                  <div>
                    <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                    <Input id="apartment" placeholder="Apt 4B" />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="New York" />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ny">New York</SelectItem>
                          <SelectItem value="ca">California</SelectItem>
                          <SelectItem value="tx">Texas</SelectItem>
                          <SelectItem value="fl">Florida</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP code</Label>
                      <Input id="zip" placeholder="10001" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Billing Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Billing Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-4">
                    <Checkbox id="sameAsShipping" checked={sameAsShipping} onCheckedChange={setSameAsShipping} />
                    <Label htmlFor="sameAsShipping">Same as shipping address</Label>
                  </div>

                  {!sameAsShipping && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="billingAddress">Street address</Label>
                        <Input id="billingAddress" placeholder="123 Main Street" />
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div>
                          <Label htmlFor="billingCity">City</Label>
                          <Input id="billingCity" placeholder="New York" />
                        </div>
                        <div>
                          <Label htmlFor="billingState">State</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ny">New York</SelectItem>
                              <SelectItem value="ca">California</SelectItem>
                              <SelectItem value="tx">Texas</SelectItem>
                              <SelectItem value="fl">Florida</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="billingZip">ZIP code</Label>
                          <Input id="billingZip" placeholder="10001" />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card">Credit or debit card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal">PayPal</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="apple" id="apple" />
                      <Label htmlFor="apple">Apple Pay</Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <div className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="cardNumber">Card number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div>
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="cardName">Name on card</Label>
                        <Input id="cardName" placeholder="John Doe" />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-md object-cover"
                        />
                        <Badge
                          variant="secondary"
                          className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                        >
                          {item.quantity}
                        </Badge>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    <Lock className="mr-2 h-4 w-4" />
                    Complete Order
                  </Button>

                  <p className="text-xs text-gray-500 text-center">Your payment information is secure and encrypted</p>
                </CardContent>
              </Card>

              {/* Shipping Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup defaultValue="standard">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard">
                          <div>
                            <p className="font-medium">Standard Shipping</p>
                            <p className="text-sm text-gray-500">5-7 business days</p>
                          </div>
                        </Label>
                      </div>
                      <span className="font-medium">$9.99</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express">
                          <div>
                            <p className="font-medium">Express Shipping</p>
                            <p className="text-sm text-gray-500">2-3 business days</p>
                          </div>
                        </Label>
                      </div>
                      <span className="font-medium">$19.99</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="overnight" id="overnight" />
                        <Label htmlFor="overnight">
                          <div>
                            <p className="font-medium">Overnight Shipping</p>
                            <p className="text-sm text-gray-500">Next business day</p>
                          </div>
                        </Label>
                      </div>
                      <span className="font-medium">$39.99</span>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
