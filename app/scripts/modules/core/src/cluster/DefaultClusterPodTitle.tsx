import * as React from 'react';
import { BindAll } from 'lodash-decorators';

import { NgReact } from 'core/reactShims';
import { EntityNotifications } from 'core/entityTag/notifications/EntityNotifications';
import { HealthCounts } from 'core/healthCounts';
import { IClusterPodTitleProps } from './ClusterPodTitleWrapper';

@BindAll()
export class DefaultClusterPodTitle extends React.Component<IClusterPodTitleProps> {

  public render(): React.ReactElement<DefaultClusterPodTitle> {
    const { AccountTag } = NgReact;
    const { grouping, application, parentHeading } = this.props;

    return (
      <div className="rollup-title-cell">
        <div className="pod-center">
          <div>
            <span className="glyphicon glyphicon-th"/>
            {' ' + grouping.heading}
          </div>

          <EntityNotifications
            entity={grouping}
            application={application}
            placement="top"
            hOffsetPercent="90%"
            entityType="cluster"
            pageLocation="pod"
            className="inverse"
            onUpdate={application.serverGroups.refresh}
          />
        </div>

        <HealthCounts container={grouping.cluster.instanceCounts}/>

      </div>
    )
  }
}
