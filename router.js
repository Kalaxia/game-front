import Vue from 'vue';
import VueRouter from 'vue-router';

import Overview from '~/pages/overview';
import Registration from '~/pages/registration';
import Faction from '~/pages/faction/faction';
import Starmap from '~/pages/map/map';
import System from '~/pages/map/system';
import Fleets from '~/pages/fleet/list';
import Fleet from '~/pages/fleet/details';
import Planet from '~/pages/planet/planet';
import Production from '~/pages/planet/production';
import Shipyard from '~/pages/planet/shipyard';

const routes = [
    { path: '/', component: Overview },
    { path: '/registration', component: Registration },
    { path: '/faction/:id', component: Faction },
    { path: '/map', component: Starmap },
    { path: '/map/systems/:id', component: System },
    { path: '/fleets', component: Fleets },
    { path: '/fleets/:id', component: Fleet },
    { path: '/planet/:id', component: Planet },
    { path: '/planet/:id/production', component: Production },
    { path: '/shipyard', component: Shipyard }
];

Vue.use(VueRouter);

export default new VueRouter({
    routes
});