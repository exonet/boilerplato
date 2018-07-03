import styled from 'react-emotion';
import { branch, renderComponent } from 'recompose';
import { TableRow } from 'spectacle';

const Bold = styled(TableRow)`
  background-color: #D3D3D3 !important;
`;

const Thick = styled(TableRow)`
  background-color: #B3B3B3 !important;
`;

const FooterRow = branch(
  ({ level }) => level > 1,
  renderComponent(Thick),
)(Bold);

export default branch(
  ({ level }) => level > 0,
  renderComponent(FooterRow),
)(TableRow);
