package org.joker.dao;

import com.google.inject.Singleton;
import org.j8ql.query.Condition;
import org.j8ql.query.Query;
import org.joker.entity.User;

import java.util.List;

@Singleton
public class UserDao extends BaseDao<User,Long> {


	// TODO: needs to return Option<User>
	public User getByUsername(String username){
		return daoHelper.first(Query.select(entityClass).where("username", username)).orElse(null);
	}

	public List<User> getUserList(User user, String keyword, int page, int pageSize, String... orderBy){
		Condition condition = null;

		if(!keyword.trim().equals("")){
			condition = Query.or("username; ilike", "%" + keyword + "%");
		}

		return  daoHelper.list(listSelectBuilder(user,condition,page,pageSize,orderBy));
	}

	/**
	 * Higher level methods to create a user.
	 * @param username
	 * @param password
	 * @return
	 */
	public User createUser(String username, String password, String avatar){
		User user = new User();
		user.setUsername(username);
		user.setPwd(password);
		user.setAvatar(avatar);
		// for User, we can create new ones without an existing User
		Long id = create(null, user);

		return get(null,id).get();
	}

	public void deleteUsers(String userIds){
		Condition condition = null;
		String[] ids = userIds.trim().split(",");

		if(!userIds.trim().equals("")){
			for(String id: ids){
				if(condition == null){
					condition = Query.or("id", Long.parseLong(id));
				}else{
					condition = condition.or("id", Long.parseLong(id));
				}
			}

			daoHelper.execute(Query.delete(entityClass).where(condition));
		}
	}

	public User updateUser(User user, Long id, String username, boolean admin){
		User u = daoHelper.first(Query.select(entityClass).where("id", id)).orElse(null);

		u.setUsername(username);
		u.setAdmin(admin);
		update(user, u, id);
		return u;
	}
		
}
