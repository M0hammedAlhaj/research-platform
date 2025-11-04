package com.mo.researchplatform.researchers.factory;

import com.mo.researchplatform.researchers.entity.Researcher;
import com.mo.researchplatform.user.domain.entity.User;
import com.mo.researchplatform.user.domain.factory.UserFactory;

public class ResearchersFactory implements UserFactory {
    @Override
    public User create() {
        return new Researcher();
    }
}