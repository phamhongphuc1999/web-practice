import { useNavigate } from 'react-router-dom';
import GroupButton from 'src/components/Button/group-button';
import { ROUTE } from 'src/configs/layout';
import useQueryUrl from 'src/hooks/useQueryUrl';
import AmBubbleChart from './AmBubbleChart';
import D3BubbleChart from './D3BubbleChart';
import D3Venn from './D3Venn';

export default function BubbleChart() {
  const navigate = useNavigate();
  const { type } = useQueryUrl();

  function onClick(id: string) {
    navigate(`${ROUTE.BUBBLE_CHART}?type=${id}`);
  }

  return (
    <>
      <GroupButton
        options={[
          { id: 'd3', content: 'd3', width: 100 },
          { id: 'amChart', content: 'amChart', width: 100 },
          { id: 'd3-venn', content: 'd3-venn', width: 100 },
        ]}
        selectedId={type || 'd3'}
        events={{ onOptionChange: onClick }}
      />
      {type == 'amChart' && <AmBubbleChart />}
      {type == 'd3-venn' ? <D3Venn /> : <D3BubbleChart />}
    </>
  );
}
