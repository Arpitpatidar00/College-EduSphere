export function generateAggregationPipeline(
  queryParams,
  query,
  sortOn = "createdAt",
  additionalSortOn = {}
) {
  let pipeline = query;

  const skip =
    ((parseInt(queryParams?.page || "1", 10) || 1) - 1) *
    (parseInt(queryParams?.limit || "0", 10) || 0);

  const dataPipeline = [
    {
      $sort: {
        [sortOn]: parseInt(queryParams?.sort || "-1", 10),
        ...additionalSortOn,
      },
    },
    { $skip: skip },
  ];

  if (queryParams?.limit) {
    dataPipeline.push({ $limit: parseInt(queryParams.limit, 10) });
  }

  pipeline = pipeline.concat([
    {
      $facet: {
        data: dataPipeline,
        totalCount: [{ $count: "count" }],
      },
    },
    {
      $addFields: {
        totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
      },
    },
  ]);

  return pipeline;
}
