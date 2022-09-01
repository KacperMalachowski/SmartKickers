import useAxios from 'axios-hooks';
import config from '../config';
import { useMemo } from 'react';

const useHeatmap = () => {
  const [{ data, loading, error }] = useAxios({
    method: 'get',
    url: `${config.apiBaseUrl}/stats`,
  });

  const heatmap = useMemo(() => (data?.Heatmap ? mirrorHeatmap() : []), [data]);

  function mirrorHeatmap() {
    const heatmapDim = data.Heatmap.length;
    const array = new Array(heatmapDim).fill(0).map(() => '');
    let numbersCopy = JSON.parse(JSON.stringify(data.Heatmap));

    //numbersCopy.forEach((arr) => arr.reverse());

    return { array, numbersCopy };
  }

  return [{ loading, error, heatmap }];
};

export default useHeatmap;
