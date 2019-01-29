import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('cms', '0007_auto_20190123_1447'),
    ]

    operations = [
        migrations.AddField(
            model_name='page',
            name='layout',
            field=models.ForeignKey(blank=True, null=True, default=None, on_delete=django.db.models.deletion.PROTECT,
                                    related_name='layout', to='cms.Block'),
        ),
    ]

