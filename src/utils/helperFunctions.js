function filterProductionActivitiesBySpace(activity, space) {
  const isApproved = activity.state === 'approved';
  const hasProdInName = (activity.name.toLowerCase().includes('prod') || activity.name.toLowerCase().includes('prd'));
  const spaceNameClean = activity.name.replace(/\s/g, '').toLowerCase();
  const hasTargetSpaceInName = spaceNameClean.includes(space);

  if (isApproved && hasProdInName && hasTargetSpaceInName) {
    const startDateTime = activity.lifetime?.start ? new Date(activity.lifetime.start)?.getTime() : undefined;
    const endDateTime = activity.lifetime?.end ? new Date(activity.lifetime.end)?.getTime() : undefined;
    const today = new Date().getTime();
      
    // Verificar se a data de "start" é anterior a hoje
    if (startDateTime && startDateTime > today) {
      return false;
    }
    // Verificar se a data de "end" é posterior a hoje
    if (endDateTime && endDateTime < today) {
      return false;
    }
    return true;
  }
  return false;
}

module.exports = {
  filterProductionActivitiesBySpace,
};
