import { react2angular } from 'react2angular';
import { IQService, module } from 'angular';
import { StateService } from '@uirouter/angularjs';

import './clusterSearchResultType';
import { AllClustersGroupings, IAllClustersGroupingsProps } from './AllClustersGroupings';
import { ON_DEMAND_CLUSTER_PICKER_COMPONENT } from './onDemand/onDemandClusterPicker.component';
import { PostSearchResultSearcherRegistry } from 'core/search/searchResult/PostSearchResultSearcherRegistry';
import { SearchResultHydratorRegistry } from 'core/search/searchResult/SearchResultHydratorRegistry';
import { ClusterPostSearchResultSearcher } from './ClusterPostSearchResultSearcher';
import { ClusterSearchResultHydrator } from './ClusterSearchResultHydrator';
import { ApplicationReader } from 'core/application/service/application.read.service';

export const CLUSTER_MODULE = 'spinnaker.core.cluster';

import { OVERRIDE_REGISTRY } from 'core/overrideRegistry';

console.debug(OVERRIDE_REGISTRY)

module(CLUSTER_MODULE, [
  require('./allClusters.controller.js').name,
  ON_DEMAND_CLUSTER_PICKER_COMPONENT,
  OVERRIDE_REGISTRY,
]).run(($q: IQService, $state: StateService, applicationReader: ApplicationReader) => {
    'ngInject';
    // const AppAllClustersGroupings = overrideRegistry.getComponent<IAllClustersGroupingsProps>('allClustersGroupings') || AllClustersGroupings
    PostSearchResultSearcherRegistry.register('clusters', 'serverGroups', new ClusterPostSearchResultSearcher($q, $state));
    SearchResultHydratorRegistry.register('clusters', new ClusterSearchResultHydrator(applicationReader));
});
// .component('allClustersGroupings', react2angular(AppAllClustersGroupings, [ 'app', 'initialized' ]));)
