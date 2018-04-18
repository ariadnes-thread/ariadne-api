--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.8
-- Dumped by pg_dump version 9.6.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: users; Type: TABLE; Schema: public; Owner: ariadne_api
--

CREATE TABLE public.users (
    ariadne_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    ariadne_password_hash character varying(64),
    first_name character varying(128) NOT NULL,
    last_name character varying(128) NOT NULL,
    email character varying(128) NOT NULL
);


ALTER TABLE public.users OWNER TO ariadne_api;

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: ariadne_api
--



--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: ariadne_api
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (ariadne_id);


--
-- Name: users_ariadne_id_uindex; Type: INDEX; Schema: public; Owner: ariadne_api
--

CREATE UNIQUE INDEX users_ariadne_id_uindex ON public.users USING btree (ariadne_id);


--
-- PostgreSQL database dump complete
--

