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

function sortOffersAsIsAtTarget(activity) {
  const { id, name, state, priority, options, experiences } = activity;

  const experiencesData = experiences.map((experience, index) => {
    return {
      position: index + 1,
      optionLocalId: experience.optionLocations[0].optionLocalId,
      audienceIds: experience.audienceIds,
      experienceName: experience.name,
    };
  });
  
  const indexedOffers = options.map((option) => {
    const experience = experiencesData.find((exp) => exp.optionLocalId === option.optionLocalId);
    option['position'] = experience.position;
    option['audienceDetails'] = {};
    option.audienceDetails['id']  = experience.audienceIds[0] || experience.audienceIds;
    option['experienceName'] = experience.experienceName;

    delete option.offerTemplates;
    return option;
  });
  
  return {
    id,
    name,
    state,
    priority,
    startsAt: activity.lifetime?.start || activity.startsAt || '',
    endsAt: activity.lifetime?.end || activity.endsAt || '',
    options: indexedOffers.sort((a, b) => a.position - b.position),
  };
}

function addAudienceDetails(activity, audienceList) {
  const optionWithAudience = activity.options.map((option) => {
    if (option.audienceDetails.id.length === 0) {
      option.audienceDetails['name'] = 'ALL VISITORS';
    } else {
      const audience = audienceList.audiences.find((audience) => audience.id === option.audienceDetails.id);
      option.audienceDetails['name'] = audience ? audience.name || audience.type : 'AUDIENCE NOT FOUND';
    }
    
    return option;
  });

  return {...activity, options: optionWithAudience};
}

module.exports = {
  filterProductionActivitiesBySpace,
  addAudienceDetails,
  sortOffersAsIsAtTarget,
};
