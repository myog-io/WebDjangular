from django import template

register = template.Library()


@register.filter(name='keyvalue')
def keyvalue(this_dict, key):
    try:
        return this_dict[key]
    except KeyError:
        return None
