from webdjango.models.CoreConfig import CoreConfigGroup, CoreConfigInput


class ProviderConfig():
    CONFIG_SVA_SCM_CODES = 'sva_scm_codes'
    CONFIG_SVA = 'sva_total'
    CONFIG_SCM = 'scm_total'
    CONFIG_STFC_CODES = 'stfc_codes'
    CONFIG_SEAC_CODES = 'seac_codes'
    CONFIG_GROUP_SLUG = 'provider'
    CONFIG_PARCELAS_INSTALACAO_0 = 'parcela_instalacao_0'
    CONFIG_PARCELAS_INSTALACAO_1 = 'parcela_instalacao_1'
    CONFIG_PARCELAS_INSTALACAO_2 = 'parcela_instalacao_2'
    CONFIG_PARCELAS_MIGRACAO_VELOCIDADE_0 = 'parcelas_migracao_velocidade_0'
    CONFIG_PARCELAS_MIGRACAO_VELOCIDADE_1 = 'parcelas_migracao_velocidade_1'
    CONFIG_PARCELAS_MIGRACAO_VELOCIDADE_2 = 'parcelas_migracao_velocidade_2'
    CONFIG_PARCELAS_MIGRACAO_TECNOLOGIA_0 = 'parcelas_migracao_tecnologia_0'
    CONFIG_PARCELAS_MIGRACAO_TECNOLOGIA_1 = 'parcelas_migracao_tecnologia_1'
    CONFIG_PARCELAS_MIGRACAO_TECNOLOGIA_2 = 'parcelas_migracao_tecnologia_2'

    CONFIG_SKU_INSTALACAO_FIBRA = 'sku_instalacao_fibra'
    CONFIG_SKU_INSTALACAO_RADIO = 'sku_instalacao_radio'
    CONFIG_SKU_MIGRACAO_RADIO = 'sku_migracao_velocidade_radio'
    CONFIG_SKU_MIGRACAO_FIBRA = 'sku_migracao_velocidade_fibra'

    CONFIG_SKU_MIGRACAO_TECNOLOGIA = 'sku_migracao_tecnologia'
    CONFIG_MAX_YEAR_CONTRACT = 'max_year_contract'

    GROUP = CoreConfigGroup(
        id=CONFIG_GROUP_SLUG,
        title="Provider",
        order=6
    )

    INPUTS = [
        CoreConfigInput(
            id=CONFIG_SKU_INSTALACAO_FIBRA,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            order=0,
            disabled=False,
            label="Cod SKU Servico Instalação Fibra",
            validation=None,
            wrapper_class="col-3",
            group=CONFIG_GROUP_SLUG,
        ),
        CoreConfigInput(
            id=CONFIG_SKU_INSTALACAO_RADIO,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            order=0,
            disabled=False,
            label="Cod SKU Servico Instalação Radio",
            validation=None,
            wrapper_class="col-3",
            group=CONFIG_GROUP_SLUG,
        ),
        CoreConfigInput(
            id=CONFIG_SKU_MIGRACAO_RADIO,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            order=0,
            disabled=False,
            label="Cod SKU Migração Velocidade Radio",
            validation=None,
            wrapper_class="col-3",
            group=CONFIG_GROUP_SLUG,
        ),
        CoreConfigInput(
            id=CONFIG_SKU_MIGRACAO_FIBRA,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            order=0,
            disabled=False,
            label="Cod SKU Migração Velocidade Fibra",
            validation=None,
            wrapper_class="col-3",
            group=CONFIG_GROUP_SLUG,
        ),
        CoreConfigInput(
            id=CONFIG_SKU_MIGRACAO_TECNOLOGIA,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            order=0,
            disabled=False,
            label="Cod SKU Migração Tecnologia",
            validation=None,
            wrapper_class="col-6",
            group=CONFIG_GROUP_SLUG,
        ),
        CoreConfigInput(
            id=CONFIG_MAX_YEAR_CONTRACT,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            input_type='number',
            order=0,
            disabled=False,
            label="Maximo de anos de contrato",
            # value=2, TODO: Default Value
            validation=None,
            wrapper_class="col-6",
            group=CONFIG_GROUP_SLUG,
        ),
        CoreConfigInput(
            id=CONFIG_PARCELAS_MIGRACAO_VELOCIDADE_0,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            input_type="number",
            order=0,
            disabled=False,
            label="Max Parcelas Migracao de Velocidade/Troca de Plano",
            validation=None,
            wrapper_class="col-4",
            group=CONFIG_GROUP_SLUG,
        ),
        CoreConfigInput(
            id=CONFIG_PARCELAS_MIGRACAO_VELOCIDADE_1,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            input_type="number",
            order=0,
            disabled=False,
            label="Max Parcelas Migracao de Velocidade/Troca de Plano 1 ano",
            validation=None,
            wrapper_class="col-4",
            group=CONFIG_GROUP_SLUG,
        ),
        CoreConfigInput(
            id=CONFIG_PARCELAS_MIGRACAO_VELOCIDADE_2,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            input_type="number",
            order=0,
            disabled=False,
            label="Max Parcelas Migracao de Velocidade/Troca de Plano 2 anos",
            validation=None,
            wrapper_class="col-4",
            group=CONFIG_GROUP_SLUG,
        ),
        CoreConfigInput(
            id=CONFIG_PARCELAS_MIGRACAO_TECNOLOGIA_0,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            input_type="number",
            order=0,
            disabled=False,
            label="Max Parcelas Migração Tecnologia Sem Fidelidade",
            validation=None,
            wrapper_class="col-4",
            group=CONFIG_GROUP_SLUG,
        ),
        CoreConfigInput(
            id=CONFIG_PARCELAS_MIGRACAO_TECNOLOGIA_1,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            input_type="number",
            order=0,
            disabled=False,
            label="Max Parcelas Migração Tecnologia Fidelidade 1 Ano",
            validation=None,
            wrapper_class="col-4",
            group=CONFIG_GROUP_SLUG,
        ),
        CoreConfigInput(
            id=CONFIG_PARCELAS_MIGRACAO_TECNOLOGIA_2,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            input_type="number",
            order=0,
            disabled=False,
            label="Max Parcelas Migração Tecnologia Fidelidade 2 Anos",
            validation=None,
            wrapper_class="col-4",
            group=CONFIG_GROUP_SLUG,
        ),

        CoreConfigInput(
            id=CONFIG_PARCELAS_INSTALACAO_0,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            input_type="number",
            order=0,
            disabled=False,
            label="Max Parcelas Instalação Sem Fidelidade",
            validation=None,
            wrapper_class="col-4",
            group=CONFIG_GROUP_SLUG,
        ),
        CoreConfigInput(
            id=CONFIG_PARCELAS_INSTALACAO_1,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            input_type="number",
            order=0,
            disabled=False,
            label="Max Parcelas Instalação Fidelidade 1 Ano",
            validation=None,
            wrapper_class="col-4",
            group=CONFIG_GROUP_SLUG,
        ),
        CoreConfigInput(
            id=CONFIG_PARCELAS_INSTALACAO_2,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            input_type="number",
            order=0,
            disabled=False,
            label="Max Parcelas Instalação Fidelidade 2 Anos",
            validation=None,
            wrapper_class="col-4",
            group=CONFIG_GROUP_SLUG,
        ),



        CoreConfigInput(
            id=CONFIG_SVA_SCM_CODES,
            field_type=CoreConfigInput.FIELD_TYPE_NGSELECT,
            input_type="multiple",
            order=0,
            disabled=False,
            label="SVA & SCM Product Types",
            select_model="ProductType",
            validation=None,
            wrapper_class="col-4",
            group=CONFIG_GROUP_SLUG,
        ),
        CoreConfigInput(
            id=CONFIG_SVA,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            input_type="number",
            order=0,
            disabled=False,
            label="SVA Percentage",
            select_model="ProductType",
            validation=None,
            wrapper_class="col-4",
            group=CONFIG_GROUP_SLUG,
        ),
        CoreConfigInput(
            id=CONFIG_SCM,
            field_type=CoreConfigInput.FIELD_TYPE_TEXT,
            input_type="number",
            order=0,
            disabled=False,
            label="SCM Percentage",
            select_model="ProductType",
            validation=None,
            wrapper_class="col-4",
            group=CONFIG_GROUP_SLUG,
        ),
        CoreConfigInput(
            id=CONFIG_STFC_CODES,
            field_type=CoreConfigInput.FIELD_TYPE_NGSELECT,
            input_type="multiple",
            order=0,
            disabled=False,
            label="STFC Product Types",
            select_model="ProductType",
            validation=None,
            wrapper_class="col-6",
            group=CONFIG_GROUP_SLUG,
        ),
        CoreConfigInput(
            id=CONFIG_SEAC_CODES,
            field_type=CoreConfigInput.FIELD_TYPE_NGSELECT,
            input_type="multiple",
            order=0,
            disabled=False,
            label="SEAC Product Types",
            select_model="ProductType",
            validation=None,
            wrapper_class="col-6",
            group=CONFIG_GROUP_SLUG,
        ),

    ]
