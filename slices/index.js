import { createSlice } from '@reduxjs/toolkit';
import { findIndex } from 'lodash';
import { CreateDummieUsers, CorrelationCoefficient } from '../data/users';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    users: CreateDummieUsers(),
    loggedInUser: CreateDummieUsers()[0],
    exerciseWeights: [
      {
        type: 'burpees',
        w1: '0.013203741',
        w2: '-1.66586335',
        w3: '-50.25245644',
        w4: '3.33097174',
        w5: '2.07874529',
      },
      {
        type: 'crunches',
        w1: '0.02125643',
        w2: '-1.01808681',
        w3: '-49.2383459',
        w4: '2.10037623',
        w5: '1.34046647',
      },
      {
        type: 'jumping jacks',
        w1: '0.013505428',
        w2: '-1.60507925',
        w3: '-50.15410732',
        w4: '3.20928581',
        w5: '2.00532234',
      },
      {
        type: 'lunges',
        w1: '0.019751678',
        w2: '-0.79923766',
        w3: '-48.90375184',
        w4: '1.6850441',
        w5: '1.09565285',
      },
      {
        type: 'sit-ups',
        w1: '0.013628844',
        w2: '-1.67061942',
        w3: '-50.25376188',
        w4: '3.33035082',
        w5: '2.08014086',
      },
      {
        type: 'push-ups',
        w1: '0.013208257',
        w2: '-1.66704339',
        w3: '-50.25365291',
        w4: '3.3326695',
        w5: '2.07872234',
      },
      {
        type: 'squats',
        w1: '0.018949696',
        w2: '-1.1359114',
        w3: '-49.40672125',
        w4: '2.3089417',
        w5: '1.4634625',
      },
      {
        type: 'deadlift',
        w1: '0.018223554',
        w2: '-1.24305736',
        w3: '-49.57581233',
        w4: '2.51376183',
        w5: '1.58657008',
      },
      {
        type: 'kickboxing',
        w1: '0.014053059',
        w2: '-1.56055613',
        w3: '-50.08353446',
        w4: '3.1261686',
        w5: '1.95617516',
      },
      {
        type: 'pilates',
        w1: '0.023441488',
        w2: '-0.76952567',
        w3: '-48.83117287',
        w4: '1.62253255',
        w5: '1.04127177',
      },
      {
        type: 'stair treadmill',
        w1: '0.008472633',
        w2: '-1.87589841',
        w3: '-50.5942652',
        w4: '3.74464956',
        w5: '2.32273413',
      },
      {
        type: 'cycling',
        w1: '0.014387329',
        w2: '-1.67003744',
        w3: '-50.25333582',
        w4: '3.33057499',
        w5: '2.07980278',
        RMSE: '6.558353998',
      },
      {
        type: 'running',
        w1: '0.008251452',
        w2: '-2.30169078',
        w3: '-51.26576078',
        w4: '4.55437525',
        w5: '2.81934793',
        RMSE: '154.6943143',
      },
      {
        type: 'walking',
        w1: '0.022387483',
        w2: '-0.72083964',
        w3: '-48.73100262',
        w4: '1.4909156',
        w5: '0.97237148',
        RMSE: '151.4710065',
      },
      {
        type: 'badminton',
        w1: '0.01681721',
        w2: '-1.23690653',
        w3: '-49.57825',
        w4: '2.51235206',
        w5: '1.58632082',
        RMSE: '16.58830769',
      },
      {
        type: 'basketball',
        w1: '0.016725773',
        w2: '-1.34700899',
        w3: '-49.74730547',
        w4: '2.71675444',
        w5: '1.7096919',
        RMSE: '5.866223406',
      },
      {
        type: 'volley ball',
        w1: '0.020120724',
        w2: '-1.0200483',
        w3: '-49.23905144',
        w4: '2.10112622',
        w5: '1.3404118',
        RMSE: '54.05568293',
      },
      {
        type: 'tennis',
        w1: '0.017879753',
        w2: '-1.23820282',
        w3: '-49.57659171',
        w4: '2.51338316',
        w5: '1.58621637',
        RMSE: '16.68464407',
      },
      {
        type: 'swimming',
        w1: '0.013305656',
        w2: '-1.62333369',
        w3: '-50.18517',
        w4: '3.24979534',
        w5: '2.02944091',
        RMSE: '3.64767823',
      },
      {
        type: 'skipping rope',
        w1: '0.01241798',
        w2: '-1.77252978',
        w3: '-50.42275279',
        w4: '3.53941038',
        w5: '2.20087191',
        RMSE: '17.64306346',
      },
    ],
  },
  reducers: {
    setUser(state, action) {
      state.loggedInUser = action.payload;
    },
    updateUser(state, action) {
      const users = [...state.users];
      const index = findIndex(users, { email: action.payload.email });
      if (index >= 0) {
        users[index] = action.payload;
      }
      state.users = users;
      state.loggedInUser = action.payload;
    },
  },
});

export const { setUser, updateUser } = appSlice.actions;
export default appSlice.reducer;
