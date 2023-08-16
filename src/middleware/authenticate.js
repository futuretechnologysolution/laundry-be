import passport from 'passport';

export const auth = {
  jwt: passport.authenticate('jwt', { session: false }),
};
