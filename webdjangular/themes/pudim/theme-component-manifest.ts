import { DynamicComponentManifest } from "../../webangular/app/dynamic-component-loader/dynamic-component-manifest";

// This array defines which "componentId" maps to which lazy-loaded module.
export const themeManifest: DynamicComponentManifest[] = [
    {
        componentId: 'page',
        path: 'page', // some globally-unique identifier, used internally by the router
        loadChildren: '../../../themes/pudim/pudim.module#PudimModule', // Mus be relativo to WebDjangular/webdjangular/webangular/app/urls/urls.module.ts
    },
];