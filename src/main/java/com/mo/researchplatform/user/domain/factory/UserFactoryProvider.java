package com.mo.researchplatform.user.domain.factory;

import com.mo.researchplatform.contributor.factory.ContributorFactory;
import com.mo.researchplatform.researchers.factory.ResearchersFactory;
import com.mo.researchplatform.user.domain.entity.User;
import com.mo.researchplatform.user.domain.model.UserType;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.EnumMap;
import java.util.Map;
import java.util.UUID;

@Component
public class UserFactoryProvider {

    private static final Map<UserType, UserFactory> userFactoryMap;

    static {
        userFactoryMap = new EnumMap<>(UserType.class);
        userFactoryMap.put(UserType.CONTRIBUTOR, new ContributorFactory());
        userFactoryMap.put(UserType.REFRESHER, new ResearchersFactory());
    }

    protected UserFactory getUserFactory(UserType userType) {
        if (userFactoryMap.containsKey(userType)) {
            return userFactoryMap.get(userType);
        }
        throw new UnsupportedOperationException("Unsupported user type");
    }

    public User createUser(String email, String password, UserType userType) {
        if (userFactoryMap.containsKey(userType)) {
            var user = userFactoryMap.get(userType).create();
            user.setId(UUID.randomUUID());
            user.setEmail(email);
            user.setPassword(password);
            user.setCreatedAt(LocalDateTime.now());
            user.setUpdatedAt(LocalDateTime.now());
            return user;
        }
        throw new UnsupportedOperationException("Unsupported user type");
    }
}
