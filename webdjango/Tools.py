from django.core.serializers.json import DjangoJSONEncoder

import collections
import importlib
import re


class Tools():
    @staticmethod
    def dict_merge(self, dct, merge_dct):
        """ Recursive dict merge. Inspired by :meth:``dict.update()``, instead of
        updating only top-level keys, dict_merge recurses down into dicts nested
        to an arbitrary depth, updating keys. The ``merge_dct`` is merged into
        ``dct``.
        :param dct: dict onto which the merge is executed
        :param merge_dct: dct merged into dct
        :return: None
        """
        # This will make sure we are not trying merge Dicts that are null
        if not dct and merge_dct:
            # If dct for some reason is null and there is a merge_dct, we don't have to merge
            dct = merge_dct
            return None
        if not merge_dct:
            # if merge_dct is null we don't have to do anything the dct is the final result anyways
            return None
        for k, v in merge_dct.items():
            if (k in dct and isinstance(dct[k], dict) and isinstance(merge_dct[k], collections.Mapping)):
                self.dict_merge(dct[k], merge_dct[k])
            else:
                dct[k] = merge_dct[k]

    @staticmethod
    def getClassReference(importFrom=None, className=None):
        module = importlib.import_module(importFrom)
        my_class = getattr(module, str(className))
        return my_class

    @staticmethod
    def fromCamelCaseToUnderscore(name=''):
        s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
        return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()
