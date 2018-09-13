from rest_framework_json_api.views import RelationshipView

from django.db.models.manager import Manager

from rest_framework.response import Response

import json


class CoreRelationshipView(RelationshipView):


    '''
        We are overring the patch function in the RelationshipView because the original
        funciton were supposed to remove the relationship between entities, however
        the original function was removing the related object it self. We dokn't want 
        this behavior, if we want to remove the related object we can call it endpoint
        directly. We use this function to update relations between objects.
    '''
    def patch(self, request, *args, **kwargs):
        parent_obj = self.get_object()
        related_instance_or_manager = self.get_related_instance()

        if isinstance(related_instance_or_manager, Manager) and 'pointer' in request.data:
            related_model_class = related_instance_or_manager.model
            serializer = self.get_serializer(data=request.data['pointer'], model_class=related_model_class, many=True)
            serializer.is_valid(raise_exception=True)
            for item in getattr(parent_obj, self.get_related_field_name()).all():
                related_instance_or_manager.remove(item)

            class_name = related_instance_or_manager.__class__.__name__
            if class_name != 'ManyRelatedManager':
                related_instance_or_manager.add(*serializer.validated_data, bulk=False)
            else:
                related_instance_or_manager.add(*serializer.validated_data)
        else:
            related_model_class = related_instance_or_manager.__class__
            serializer = self.get_serializer(data=request.data, model_class=related_model_class)
            serializer.is_valid(raise_exception=True)
            setattr(parent_obj, self.get_related_field_name(), serializer.validated_data)
            parent_obj.save()
            related_instance_or_manager = self.get_related_instance()  # Refresh instance

        result_serializer = self._instantiate_serializer(related_instance_or_manager)
        return Response(result_serializer.data)