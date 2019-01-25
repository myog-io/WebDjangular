from django.db import models
from django_mysql.models import JSONField
from django.utils import timezone
from libs.plugins.store.api import defaults
from webdjango.models.AbstractModels import ActiveModel, BaseModel
from functools import partial
from prices import Money, fixed_discount, percentage_discount
from functools import partial

from django.db import models
from django.utils import timezone
from django_mysql.models import JSONField
from prices import Money, fixed_discount, percentage_discount

from libs.plugins.store.api import defaults
from webdjango.models.AbstractModels import ActiveModel, BaseModel


class RuleValueType:
    FIXED = 'fixed'
    PERCENTAGE = 'percentage'
    TO_VALUE = 'to_value'
    FEE= 'fee'

    CHOICES = [
        (FIXED, defaults.DEFAULT_CURRENCY),
        (PERCENTAGE, '%'),
        (FEE, defaults.DEFAULT_CURRENCY)
    ]


class CartRuleQueryset(models.QuerySet):
    def active(self):
        today = timezone.now()
        return self.filter(
            is_active=True,
            end__gte=today, start__lte=today)

class CartRule(ActiveModel, BaseModel):
    name = models.CharField(max_length=255, null=True, blank=True)
    conditions = JSONField(default=None, blank=True, null=True)
    rule_type = models.CharField(max_length=10,
                                 choices=RuleValueType.CHOICES,
                                 default=RuleValueType.FIXED)
    value = models.DecimalField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                                decimal_places=defaults.DEFAULT_DECIMAL_PLACES)

    voucher = models.CharField(max_length=12, unique=True, db_index=True)
    require_voucher = models.BooleanField(default=False)

    usage_limit = models.PositiveIntegerField(null=True, blank=True)
    used = models.PositiveIntegerField(default=0, editable=False)

    start = models.DateTimeField(null=False)
    end = models.DateTimeField(null=False)

    # if the discount is applied per order or individually to every product
    apply_once_per_order = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    objects = CartRuleQueryset.as_manager()
    class Meta:
        ordering = ['-pk']


class CatalogRuleQueryset(models.QuerySet):
    def active(self):
        today = timezone.now()
        return self.filter(
            is_active=True,
            end__gte=today, start__lte=today)


class CatalogRule(ActiveModel, BaseModel):
    name = models.CharField(max_length=255)
    conditions = JSONField(default=None, blank=True, null=True)
    rule_type = models.CharField(max_length=10,
                                 choices=RuleValueType.CHOICES,
                                 default=RuleValueType.FIXED)
    value = models.DecimalField(max_digits=defaults.DEFAULT_MAX_DIGITS,
                                decimal_places=defaults.DEFAULT_DECIMAL_PLACES,
                                default=0)
    is_active = models.BooleanField(default=False)

    start = models.DateTimeField(null=False)
    end = models.DateTimeField(null=False)
    objects = CatalogRuleQueryset.as_manager()

    class Meta:
        ordering = ['-pk']

    def get_discount(self):
        if self.rule_type == RuleValueType.FIXED:
            discount_amount = Money(self.value, defaults.DEFAULT_CURRENCY)
            return partial(fixed_discount, discount=discount_amount)
        if self.rule_type == RuleValueType.PERCENTAGE:
            return partial(percentage_discount, percentage=self.value)
        raise NotImplementedError('Unknown discount type')
