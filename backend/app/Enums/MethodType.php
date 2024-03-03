<?php

namespace App\Enums;

enum MethodType: string
{
    case CreditCard = 'credit_card';
    case DebitCard = 'debit_card';
    case Card = 'card';
    case Pix = 'pix';
    case Money = 'money';
}
