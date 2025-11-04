package com.mo.researchplatform.contributor.factory;

import com.mo.researchplatform.contributor.entity.Contributor;
import com.mo.researchplatform.user.domain.entity.User;
import com.mo.researchplatform.user.domain.factory.UserFactory;

public class ContributorFactory implements UserFactory {
    @Override
    public User create() {
        return new Contributor();
    }
}
