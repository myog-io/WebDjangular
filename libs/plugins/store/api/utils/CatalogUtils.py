import sys
import traceback
from ..models.Discount import CatalogRule
from webdjango.utils.JsonLogic import jsonLogic




def apply_catalog_rule(price, rule):
    discount = rule.get_discount()
    gross_after_discount = discount(price)
    if gross_after_discount.amount < 0:
        return price
    return gross_after_discount


def calculate_discounted_price(product):
    '''
    Based on the Catalog Rules we will see if any of them apply to this product
    '''
    base_price = product.base_price
    rules = CatalogRule.objects.active().all()
    for rule in rules:
        if rule.conditions and len(rule.conditions) > 0:
            data = {}
            data['product'] = vars(product)
            try:
                if jsonLogic(rule.conditions, data):
                    base_price = apply_catalog_rule(base_price, rule)
            except:
                print("Unexpected error:", sys.exc_info())
                traceback.print_tb(sys.exc_info()[2])
                raise
            # apply Rule
        else:
            base_price = apply_catalog_rule(base_price, rule)
            # apply rule

    return base_price
