const importEndPoint = () => process.env.REACT_APP_PASSPORT_END_POINT+'/import-template';

export const REGION_IMPORT = {
    TEMPLATE_URL: `${importEndPoint()}/Template-Region.xlsx`,
    TEMPLATE_NAME: `template-region.xlsx`
}

export const AREA_IMPORT = {
    TEMPLATE_URL: `${importEndPoint()}/Template-Area.xlsx`,
    TEMPLATE_NAME: `template-area.xlsx`
}

export const CLUSTER_IMPORT = {
    TEMPLATE_URL: `${importEndPoint()}/Template-Cluster.xlsx`,
    TEMPLATE_NAME: `template-cluster.xlsx`
}

export const SUBTERRITORY_IMPORT = {
    TEMPLATE_URL: `${importEndPoint()}/Template-Subterritory.xlsx`,
    TEMPLATE_NAME: `template-subterritory.xlsx`
}

export const TERRITORY_IMPORT = {
    TEMPLATE_URL: `${importEndPoint()}/Template-Territory.xlsx`,
    TEMPLATE_NAME: `template-territory.xlsx`
}

export const BRAND_IMPORT = {
    TEMPLATE_URL: `${importEndPoint()}/Template-Brand.xlsx`,
    TEMPLATE_NAME: `template-brand.xlsx`
}

export const PRODUCT_IMPORT = {
    TEMPLATE_URL: `${importEndPoint()}/Template-Product.xlsx`,
    TEMPLATE_NAME: `template-product.xlsx`
}

export const DEALER_IMPORT = {
    TEMPLATE_URL: `${importEndPoint()}/Template-Dealer.xlsx`,
    TEMPLATE_NAME: `template-dealer.xlsx`
}

export const DEALER_PRODUCT_IMPORT = {
    TEMPLATE_URL: `${importEndPoint()}/Template-Dealer-Product.xlsx`,
    TEMPLATE_NAME: `template-dealer-product.xlsx`
}

export const DEALER_BRAND_IMPORT = {
    TEMPLATE_URL: `${importEndPoint()}/Template-Dealer-Brand.xlsx`,
    TEMPLATE_NAME: `template-dealer-brand.xlsx`
}

export const SALES_IMPORT = {
    TEMPLATE_URL: `${importEndPoint()}/Template-User-Dealer.xlsx`,
    TEMPLATE_NAME: `template-user-dealer.xlsx`
}


export const JOURNEY_IMPORT = {
    TEMPLATE_URL: `${importEndPoint()}/Template-Journey-Plan.xlsx`,
    TEMPLATE_NAME: `template-journey-plan.xlsx`
}

