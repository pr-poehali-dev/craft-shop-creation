import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  deliveryMethod: string;
  paymentMethod: string;
  comments: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CheckoutForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    deliveryMethod: 'courier',
    paymentMethod: 'card',
    comments: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutForm, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Введите имя';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Введите фамилию';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Некорректный email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите телефон';
    } else if (!/^\+?[0-9\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Некорректный номер телефона';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Введите адрес';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'Введите город';
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Введите индекс';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof CheckoutForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Ошибка валидации",
        description: "Пожалуйста, заполните все обязательные поля корректно"
      });
      return;
    }

    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Заказ оформлен!",
      description: "Мы свяжемся с вами в ближайшее время"
    });
    
    setIsSubmitting(false);
    setTimeout(() => navigate('/'), 2000);
  };

  const cartItems = [
    { name: 'Набор пряжи "Радуга"', price: 1299, quantity: 2 },
    { name: 'Набор для вышивки "Цветы"', price: 899, quantity: 1 }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = formData.deliveryMethod === 'courier' ? 300 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 via-background to-accent/30">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                <Icon name="Sparkles" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Оформление заказа
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="User" size={20} />
                    Контактная информация
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Имя *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={errors.firstName ? 'border-destructive' : ''}
                      />
                      {errors.firstName && (
                        <p className="text-xs text-destructive">{errors.firstName}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Фамилия *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={errors.lastName ? 'border-destructive' : ''}
                      />
                      {errors.lastName && (
                        <p className="text-xs text-destructive">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={errors.email ? 'border-destructive' : ''}
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive">{errors.email}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+7 (999) 123-45-67"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={errors.phone ? 'border-destructive' : ''}
                      />
                      {errors.phone && (
                        <p className="text-xs text-destructive">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="MapPin" size={20} />
                    Адрес доставки
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Адрес *</Label>
                    <Input
                      id="address"
                      placeholder="Улица, дом, квартира"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className={errors.address ? 'border-destructive' : ''}
                    />
                    {errors.address && (
                      <p className="text-xs text-destructive">{errors.address}</p>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Город *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className={errors.city ? 'border-destructive' : ''}
                      />
                      {errors.city && (
                        <p className="text-xs text-destructive">{errors.city}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Индекс *</Label>
                      <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        className={errors.postalCode ? 'border-destructive' : ''}
                      />
                      {errors.postalCode && (
                        <p className="text-xs text-destructive">{errors.postalCode}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Truck" size={20} />
                    Способ доставки
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.deliveryMethod}
                    onValueChange={(value) => handleInputChange('deliveryMethod', value)}
                  >
                    <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="courier" id="courier" />
                      <Label htmlFor="courier" className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Курьерская доставка</p>
                            <p className="text-sm text-muted-foreground">3-5 рабочих дней</p>
                          </div>
                          <span className="font-semibold">300 ₽</span>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Самовывоз</p>
                            <p className="text-sm text-muted-foreground">Из пункта выдачи</p>
                          </div>
                          <span className="font-semibold">Бесплатно</span>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="CreditCard" size={20} />
                    Способ оплаты
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => handleInputChange('paymentMethod', value)}
                  >
                    <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        <p className="font-medium">Банковская карта</p>
                        <p className="text-sm text-muted-foreground">Visa, MasterCard, МИР</p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex-1 cursor-pointer">
                        <p className="font-medium">Наличными при получении</p>
                        <p className="text-sm text-muted-foreground">Оплата курьеру</p>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{ animationDelay: '400ms' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="MessageSquare" size={20} />
                    Комментарий к заказу
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Укажите дополнительную информацию (необязательно)"
                    value={formData.comments}
                    onChange={(e) => handleInputChange('comments', e.target.value)}
                    rows={4}
                  />
                </CardContent>
              </Card>
            </form>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24 animate-fade-in" style={{ animationDelay: '500ms' }}>
              <CardHeader>
                <CardTitle>Ваш заказ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="flex-1">{item.name} × {item.quantity}</span>
                      <span className="font-semibold">{item.price * item.quantity} ₽</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Товары</span>
                    <span>{subtotal} ₽</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Доставка</span>
                    <span>{deliveryFee === 0 ? 'Бесплатно' : `${deliveryFee} ₽`}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-semibold">Итого:</span>
                    <span className="text-2xl font-bold text-primary">{total} ₽</span>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                        Оформление...
                      </>
                    ) : (
                      <>
                        <Icon name="Check" size={20} className="mr-2" />
                        Подтвердить заказ
                      </>
                    )}
                  </Button>
                </div>

                <div className="bg-accent/30 p-4 rounded-lg text-sm">
                  <div className="flex items-start gap-2">
                    <Icon name="Shield" size={16} className="text-primary mt-0.5" />
                    <p className="text-muted-foreground">
                      Мы гарантируем безопасность ваших данных
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
