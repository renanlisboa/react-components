import {
  Link as RouterDomLink,
  LinkProps as RouterDomLinkProps,
} from "react-router-dom";

export function Link(props: RouterDomLinkProps) {
  return <RouterDomLink {...props} />;
}
